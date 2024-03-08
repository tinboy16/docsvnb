# Mantra
port 111, chain id: mantrachain-testnet-1

# Automatic:
```
curl -o mantra.sh https://raw.githubusercontent.com/vnbnode/binaries/main/Projects/Mantra/mantra.sh && chmod +x mantra.sh && ./mantra.sh
```
# Snapshot:
```
sudo systemctl stop mantrachaind

cp $HOME/.mantrachain/data/priv_validator_state.json $HOME/.mantrachain/priv_validator_state.json.backup

rm -rf $HOME/.mantrachain/data 
curl https://testnet-files.itrocket.net/mantra/snap_mantra.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.mantrachain

mv $HOME/.mantrachain/priv_validator_state.json.backup $HOME/.mantrachain/data/priv_validator_state.json

sudo systemctl restart mantrachaind && sudo journalctl -u mantrachaind -f
```
# Manual:
# Moniker
Replace YOUR_MONIKER_GOES_HERE with your validator name

MONIKER="YOUR_MONIKER_GOES_HERE"

# Update Packages
```
sudo apt update && apt upgrade -y
sudo apt install curl git jq lz4 build-essential unzip fail2ban ufw -y
```
# Install Go
```
ver="1.20.3"
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz"
rm "go$ver.linux-amd64.tar.gz"
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile
source $HOME/.bash_profile
go version
```
# Install Cosmovisor
```
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

# Dowload binary
```
cd $HOME
wget https://github.com/MANTRA-Finance/public/raw/main/mantrachain-testnet/mantrachaind-linux-amd64.zip
unzip mantrachaind-linux-amd64.zip
sudo chmod +x mantrachaind
rm mantrachaind-linux-amd64.zip

# Setup Cosmovisor Symlinks
mkdir -p $HOME/.mantrachain/cosmovisor/genesis/bin
mv mantrachaind $HOME/.mantrachain/cosmovisor/genesis/bin/

sudo ln -s $HOME/.mantrachain/cosmovisor/genesis $HOME/.mantrachain/cosmovisor/current
sudo ln -s $HOME/.mantrachain/cosmovisor/current/bin/mantrachaind /usr/local/bin/mantrachaind
```
# Set Configuration for your node
```
mantrachaind config node tcp://localhost:11157
mantrachaind config chain-id mantrachain-testnet-1
mantrachaind config keyring-backend test
```
# Init your node
```
mantrachaind init $MONIKER --chain-id mantrachain-testnet-1
```
# Add Genesis File and Addrbook
```
wget -O $HOME/.mantrachain/config/genesis.json https://testnet-files.itrocket.net/mantra/genesis.json
wget -O $HOME/.mantrachain/config/addrbook.json https://testnet-files.itrocket.net/mantra/addrbook.json
```

# Configure Seeds and Peers
```
SEEDS="a9a71700397ce950a9396421877196ac19e7cde0@mantra-testnet-seed.itrocket.net:22656"
PEERS="1a46b1db53d1ff3dbec56ec93269f6a0d15faeb4@mantra-testnet-peer.itrocket.net:22656,63763bfb78d296187754c367a9740e24730a7fc4@167.235.14.83:32656,64691a4202c1ad29a416b21ce21bfc9659783406@34.136.169.18:26656,d44eb6a1ea69263eb0a61bab354fb267396b27e1@34.70.189.2:26656,62cadc3da28e1a4785a2abf76c40f1c4e0eaeebd@34.123.40.240:26656,c4bec34390d2ab1004b9a25580c75e4743e033a1@65.108.72.253:22656,e6921a8a228e12ebab0ab70d9bcdb5364c5dece5@65.108.200.40:47656,2d2f8b62feee6b0fcbdec78d51d4ba9959e33c87@65.108.124.219:34656,4a22a9cbabe4313674d2058a964aef2863af9213@185.197.251.195:26656,c0828205f0dea4ef6feb61ee7a9e8f376be210f4@161.97.149.123:29656,30235fa097d100a14d2b534fdbf67e34e8d5f6cf@65.21.133.86:21656,41adbdacfd006720fd55c6b48695d8cde9277b5c@62.171.130.196:11156"
sed -i -e "s/^seeds *=.*/seeds = \"$SEEDS\"/; s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.mantrachain/config/config.toml
```
# Set Pruning, Enable Prometheus, Gas Price, and Indexer
```
PRUNING="custom"
PRUNING_KEEP_RECENT="100"
PRUNING_INTERVAL="19"

sed -i -e "s/^pruning *=.*/pruning = \"$PRUNING\"/" $HOME/.mantrachain/config/app.toml
sed -i -e "s/^pruning-keep-recent *=.*/pruning-keep-recent = \
\"$PRUNING_KEEP_RECENT\"/" $HOME/.mantrachain/config/app.toml
sed -i -e "s/^pruning-interval *=.*/pruning-interval = \
\"$PRUNING_INTERVAL\"/" $HOME/.mantrachain/config/app.toml
sed -i -e 's|^indexer *=.*|indexer = "null"|' $HOME/.mantrachain/config/config.toml
sed -i 's|^prometheus *=.*|prometheus = true|' $HOME/.mantrachain/config/config.toml
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0uaum\"/" $HOME/.mantrachain/config/app.toml
```
# Set Service file
```
sudo tee /etc/systemd/system/mantrachaind.service > /dev/null << EOF
[Unit]
Description=mantrachaind testnet node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=$HOME/.mantrachain"
Environment="DAEMON_NAME=mantrachaind"
Environment="UNSAFE_SKIP_BACKUP=true"

[Install]
WantedBy=multi-user.target
EOF
sudo systemctl daemon-reload
sudo systemctl enable mantrachaind
```
```
CUSTOM_PORT=111
sed -i -e "s%^proxy_app = \"tcp://127.0.0.1:26658\"%proxy_app = \"tcp://127.0.0.1:${CUSTOM_PORT}58\"%; s%^laddr = \"tcp://127.0.0.1:26657\"%laddr = \"tcp://127.0.0.1:${CUSTOM_PORT}57\"%; s%^pprof_laddr = \"localhost:6060\"%pprof_laddr = \"localhost:${CUSTOM_PORT}60\"%; s%^laddr = \"tcp://0.0.0.0:26656\"%laddr = \"tcp://0.0.0.0:${CUSTOM_PORT}56\"%; s%^prometheus_listen_addr = \":26660\"%prometheus_listen_addr = \":${CUSTOM_PORT}66\"%" $HOME/.mantrachain/config/config.toml
sed -i -e "s%^address = \"tcp://localhost:1317\"%address = \"tcp://0.0.0.0:${CUSTOM_PORT}17\"%; s%^address = \":8080\"%address = \":${CUSTOM_PORT}80\"%; s%^address = \"localhost:9090\"%address = \"0.0.0.0:${CUSTOM_PORT}90\"%; s%^address = \"localhost:9091\"%address = \"0.0.0.0:${CUSTOM_PORT}91\"%" $HOME/.mantrachain/config/app.toml
```
# Start the Node
```
sudo systemctl restart mantrachaind
sudo journalctl -fu mantrachaind -o cat
```

# Command
Key management
Add New Wallet
```
mantrachaind keys add wallet
```
Restore executing wallet
```
mantrachaind keys add wallet --recover
```
List All Wallets
```
mantrachaind keys list
```
Delete wallet
```
mantrachaind keys delete wallet
```
Check Balance
```
mantrachaind q bank balances $(mantrachaind keys show wallet -a)
```
Export Key (save to wallet.backup)
```
mantrachaind keys export wallet
```
Import Key (restore from wallet.backup)
```
mantrachaind keys import wallet wallet.backup
```
Withdraw all rewards
```
mantrachaind tx distribution withdraw-all-rewards --from wallet --chain-id mantrachain-testnet-1 --gas auto --gas-adjustment 1.5
```
Withdraw rewards and commission from your validator
```
mantrachaind tx distribution withdraw-rewards $(mantrachaind keys show wallet --bech val -a) --commission --from wallet --chain-id mantrachain-testnet-1 --gas-prices=0uaum --gas-adjustment 1.5 --gas "auto" -y 
```
Delegate to Yourself
```
mantrachaind tx staking delegate $(mantrachaind keys show wallet --bech val -a) 1000000uaum --from wallet --chain-id mantrachain-testnet-1 --gas auto --gas-adjustment 1.5 -y
```
Delegate
```
mantrachaind tx staking delegate <TO_VALOPER_ADDRESS> 1000000uaum --from wallet --chain-id mantrachain-testnet-1 --gas auto --gas-adjustment 1.5 -y
```
Redelegate Stake to Another Validator
```
mantrachaind tx staking redelegate $VALOPER_ADDRESS <TO_VALOPER_ADDRESS> 1000000uaum --from wallet --chain-id mantrachain-testnet-1 --gas auto --gas-adjustment 1.5 -y
```
Unbond
```
mantrachaind tx staking unbond $(mantrachaind keys show wallet --bech val -a) 1000000uaum --from wallet --chain-id mantrachain-testnet-1 --gas auto --gas-adjustment 1.5 -y
```
Transfer Funds
```
mantrachaind tx bank send wallet_ADDRESS <TO_WALLET_ADDRESS> 1000000uaum --gas auto --gas-adjustment 1.5 -y
```
Create New Validator
```
mantrachaind tx staking create-validator \
  --amount "1000000uaum" \
  --pubkey $(mantrachaind tendermint show-validator) \
  --moniker "MONIKER" \
  --identity "KEYBASE_ID" \
  --details "YOUR DETAILS" \
  --website "YOUR WEBSITE" \
  --chain-id mantrachain-testnet-1 \
  --commission-rate "0.05" \
  --commission-max-rate "0.20" \
  --commission-max-change-rate "0.01" \
  --min-self-delegation "1" \
  --gas-prices "0uaum" \
  --gas "auto" \
  --gas-adjustment "1.5" \
  --from wallet \
  -y
```
Edit Existing Validator
```
mantrachaind tx staking edit-validator \
--commission-rate 0.1 \
--new-moniker "$MONIKER" \
--identity "" \
--details "" \
--from wallet \
--chain-id mantrachain-testnet-1 \
--gas auto --gas-adjustment 1.5 \
-y
```
Validator info
```
mantrachaind status 2>&1 | jq .ValidatorInfo
```
Validator Details
```
mantrachaind q staking validator $(mantrachaind keys show wallet --bech val -a)
```
Jailing info
```
mantrachaind q slashing signing-info $(mantrachaind tendermint show-validator)
```
Unjail validator
```
mantrachaind tx slashing unjail --from wallet --chain-id mantrachain-testnet-1 --gas auto --gas-adjustment 1.5 -y
```
Active Validators List
```
mantrachaind q staking validators -oj --limit=2000 | jq '.validators[] | select(.status=="BOND_STATUS_BONDED")' | jq -r '(.tokens|tonumber/pow(10; 6)|floor|tostring) + " 	 " + .description.moniker' | sort -gr | nl
```
Check Validator key
```
[[ $(mantrachaind q staking validator $VALOPER_ADDRESS -oj | jq -r .consensus_pubkey.key) = $(mantrachaind status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "Your key status is ok" || echo -e "Your key status is error"
```
Signing info
```
mantrachaind q slashing signing-info $(mantrachaind tendermint show-validator)
```
```
mantrachaind  tx gov submit-proposal \
--title "" \
--description "" \
--deposit 1000000uaum \
--type Text \
--from wallet \
--gas auto --gas-adjustment 1.5 \
-y
```
🗳 Governance
List all proposals
```
mantrachaind query gov proposals
```
View proposal by id
```
mantrachaind query gov proposal 1
```
Vote 'Yes'
```
mantrachaind tx gov vote 78 yes --from wallet --chain-id mantrachain-testnet-1 --gas auto --gas-adjustment 1.5 -y
```
Vote 'No'
```
mantrachaind tx gov vote 1 no --from wallet --chain-id mantrachain-testnet-1 --gas auto --gas-adjustment 1.5 -y
```
Vote 'Abstain'
```
mantrachaind tx gov vote 1 abstain --from wallet --chain-id mantrachain-testnet-1 --gas auto --gas-adjustment 1.5 -y
```
Vote 'NoWithVeto'
```
mantrachaind tx gov vote 1 nowithveto --from wallet --chain-id mantrachain-testnet-1 --gas auto --gas-adjustment 1.5 -y
```
Remove node
```
sudo systemctl stop mantrachaind
sudo systemctl disable mantrachaind
sudo rm /etc/systemd/system/mantrachaind.service
sudo systemctl daemon-reload
rm -f $(which mantrachaind)
rm -rf $HOME/mantrachaind
rm -rf $HOME/.mantrachain
rm -rf $HOME/mantra.sh
```


## Thank to support VNBnode.
### Visit us at:

* <img src="https://user-images.githubusercontent.com/50621007/183283867-56b4d69f-bc6e-4939-b00a-72aa019d1aea.png" width="30"/> <a href="https://t.me/VNBnodegroup" target="_blank">VNBnode Group</a>

* <img src="https://user-images.githubusercontent.com/50621007/183283867-56b4d69f-bc6e-4939-b00a-72aa019d1aea.png" width="30"/> <a href="https://t.me/Vnbnode" target="_blank">VNBnode News</a>

* <img src="https://raw.githubusercontent.com/vnbnode/binaries/main/Logo/VNBnode.jpg" width="30"/> <a href="https://VNBnode.com" target="_blank">VNBnode</a>