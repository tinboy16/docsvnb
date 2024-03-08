# Arkeo

Port: 186. Chain id: arkeo

# Automatic:
```
curl -o arkeo.sh https://raw.githubusercontent.com/vnbnode/binaries/main/Projects/Arkeo/arkeo.sh && chmod +x arkeo.sh && ./arkeo.sh
```
# Snapshot:
```
sudo systemctl stop arkeod
cp $HOME/.arkeo/data/priv_validator_state.json $HOME/.arkeo/priv_validator_state.json.backup
rm -rf $HOME/.arkeo/data 
curl https://testnet-files.itrocket.net/arkeo/snap_arkeo.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.arkeo
mv $HOME/.arkeo/priv_validator_state.json.backup $HOME/.arkeo/data/priv_validator_state.json
sudo systemctl restart arkeod && sudo journalctl -u arkeod -f
```
# Manual:
Replace YOUR_MONIKER_GOES_HERE with your validator name

MONIKER="YOUR_MONIKER_GOES_HERE"

Install dependencies
UPDATE SYSTEM AND INSTALL BUILD TOOLS
```
sudo apt -q update
sudo apt -qy install curl git jq lz4 build-essential
sudo apt -qy upgrade
```
INSTALL GO
```
sudo rm -rf /usr/local/go
curl -Ls https://go.dev/dl/go1.20.8.linux-amd64.tar.gz | sudo tar -xzf - -C /usr/local
eval $(echo 'export PATH=$PATH:/usr/local/go/bin' | sudo tee /etc/profile.d/golang.sh)
eval $(echo 'export PATH=$PATH:$HOME/go/bin' | tee -a $HOME/.profile)
```
Download binaries
```
cd $HOME
rm -rf arkeod
wget https://testnet-files.itrocket.net/arkeo/arkeod
chmod +x arkeod
mv arkeod /root/go/bin/
arkeod version
```
# Create service
```
sudo tee /etc/systemd/system/arkeod.service > /dev/null << EOF
[Unit]
Description=arkeoension node service
After=network-online.target

[Service]
sudo tee /etc/systemd/system/arkeod.service > /dev/null <<EOF
[Unit]
Description=Arkeo testnet
After=network-online.target

[Service]
User=$USER
ExecStart=$(which arkeod) start
Restart=on-failure
RestartSec=3
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF
sudo systemctl daemon-reload
sudo systemctl enable arkeod
```
# Set node configuration
```
arkeod config chain-id arkeo
arkeod config keyring-backend test
arkeod config node tcp://localhost:18657
```
# Initialize the node
```
arkeod init $MONIKER --chain-id arkeo
```
# Download genesis and addrbook
```
wget -O $HOME/.arkeo/config/genesis.json https://testnet-files.itrocket.net/arkeo/genesis.json
wget -O $HOME/.arkeo/config/addrbook.json https://testnet-files.itrocket.net/arkeo/addrbook.json
```
# Add seeds
```
PEERS="5c3ca78b11bbd746f950c198cac51d4e5d4c0750@arkeo-testnet-peer.itrocket.net:18656,769de3fabb66d2dcbae7550ce7252f6f469c5d3f@65.108.126.188:26856,e033753cac027fc6605a95dab3b3fc5550d4b9bf@65.109.84.33:40656,25a9af68f987e254e50d6d7e6a1e68a5a40c1b7c@65.109.92.148:60556,6ae2136893a08a412f0c02eab8d595d502cd5457@65.108.206.118:36656,f970798283d0460832f6c964569ca894a4b6218e@65.108.124.121:61056,be71f456a7aa3da953db899298b53d28b75f4676@65.108.229.93:37656,b487e892071fd3d89cc9d0de60eeed60ba7c4e5c@65.109.116.119:15756,893a44b8501faa22fbe2f4d61c6586f231bd1638@65.109.28.177:33656,8c2d799bcc4fbf44ef34bbd2631db5c3f4619e41@213.239.207.175:60656,8e7c1c3d2416acf5fc9c9b6b74a8d9f53db1f567@94.130.220.233:26646,a2130910e8f8a04888b9b01a372fa1e74ab50b3a@62.171.130.196:11156"
sed -i 's|^persistent_peers *=.*|persistent_peers = "'$PEERS'"|' $HOME/.arkeo/config/config.toml
sed -i -e "s|^seeds *=.*|seeds = \"\"|" $HOME/.arkeo/config/config.toml
```
# Set minimum gas price
```
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0uarkeo\"/" $HOME/.arkeo/config/app.toml
sed -i -e "s/^indexer *=.*/indexer = \"null\"/" $HOME/.arkeo/config/config.toml
```
# Set pruning
```
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  $HOME/.arkeo/config/app.toml
```
# Set custom ports
```
sed -i -e "s%^proxy_app = \"tcp://127.0.0.1:26658\"%proxy_app = \"tcp://127.0.0.1:18658\"%; s%^laddr = \"tcp://127.0.0.1:26657\"%laddr = \"tcp://127.0.0.1:18657\"%; s%^pprof_laddr = \"localhost:6060\"%pprof_laddr = \"localhost:18660\"%; s%^laddr = \"tcp://0.0.0.0:26656\"%laddr = \"tcp://0.0.0.0:18656\"%; s%^prometheus_listen_addr = \":26660\"%prometheus_listen_addr = \":18666\"%" $HOME/.arkeo/config/config.toml
sed -i -e "s%^address = \"tcp://0.0.0.0:1317\"%address = \"tcp://0.0.0.0:18617\"%; s%^address = \":8080\"%address = \":18680\"%; s%^address = \"0.0.0.0:9090\"%address = \"0.0.0.0:18690\"%; s%^address = \"0.0.0.0:9091\"%address = \"0.0.0.0:18691\"%; s%:8545%:18645%; s%:8546%:18646%; s%:6065%:18665%" $HOME/.arkeo/config/app.toml
```
# Start service and check the logs
```
sudo systemctl start arkeod && sudo journalctl -u arkeod -f --no-hostname -o cat
```

# Arkeo Command

Key management
Add New Wallet
```
arkeod keys add wallet
```
Restore executing wallet
```
arkeod keys add wallet --recover
```
List All Wallets
```
arkeod keys list
```
Delete wallet
```
arkeod keys delete wallet
```
Check Balance
```
arkeod q bank balances $(arkeod keys show wallet -a)
```
Export Key (save to wallet.backup)
```
arkeod keys export wallet
```
Import Key (restore from wallet.backup)
```
arkeod keys import wallet wallet.backup
```
Withdraw all rewards
```
arkeod tx distribution withdraw-all-rewards --from wallet --chain-id arkeo --gas auto --gas-adjustment 1.5
```
Withdraw rewards and commission from your validator
```
arkeod tx distribution withdraw-rewards $VALOPER_ADDRESS --from wallet --commission --chain-id arkeo --gas auto --gas-adjustment 1.5 -y
```
Check your balance
```
arkeod query bank balances wallet_ADDRESS
```
Delegate to Yourself
```
arkeod tx staking delegate $(arkeod keys show wallet --bech val -a) 1000000uarkeo --from wallet --chain-id arkeo --gas auto --gas-adjustment 1.5 -y
```
Delegate
```
arkeod tx staking delegate <TO_VALOPER_ADDRESS> 1000000uarkeo --from wallet --chain-id arkeo --gas auto --gas-adjustment 1.5 -y
```
Redelegate Stake to Another Validator
```
arkeod tx staking redelegate $VALOPER_ADDRESS <TO_VALOPER_ADDRESS> 1000000uarkeo --from wallet --chain-id arkeo --gas auto --gas-adjustment 1.5 -y
```
Unbond
```
arkeod tx staking unbond $(arkeod keys show wallet --bech val -a) 1000000uarkeo --from wallet --chain-id arkeo --gas auto --gas-adjustment 1.5 -y
```
Transfer Funds
```
arkeod tx bank send wallet_ADDRESS <TO_WALLET_ADDRESS> 1000000uarkeo --gas auto --gas-adjustment 1.5 -y
```
Create New Validator
```
arkeod tx staking create-validator \
--amount 1000000uarkeo \
--from wallet \
--commission-rate 0.1 \
--commission-max-rate 0.2 \
--commission-max-change-rate 0.01 \
--min-self-delegation 1 \
--pubkey $(arkeod tendermint show-validator) \
--moniker "$MONIKER" \
--identity "" \
--details "" \
--chain-id arkeo \
--gas auto --gas-adjustment 1.5 \
-y
```
Edit Existing Validator
```
arkeod tx staking edit-validator \
--commission-rate 0.1 \
--new-moniker "$MONIKER" \
--identity "" \
--details "" \
--from wallet \
--chain-id arkeo \
--gas auto --gas-adjustment 1.5 \
-y
```
Validator info
```
arkeod status 2>&1 | jq .ValidatorInfo
```
Validator Details
```
arkeod q staking validator $(arkeod keys show wallet --bech val -a)
```
Jailing info
```
arkeod q slashing signing-info $(arkeod tendermint show-validator)
```
Unjail validator
```
arkeod tx slashing unjail --from wallet --chain-id arkeo --gas auto --gas-adjustment 1.5 -y
```
Active Validators List
```
arkeod q staking validators -oj --limit=2000 | jq '.validators[] | select(.status=="BOND_STATUS_BONDED")' | jq -r '(.tokens|tonumber/pow(10; 6)|floor|tostring) + " 	 " + .description.moniker' | sort -gr | nl
```
Check Validator key
```
[[ $(arkeod q staking validator $VALOPER_ADDRESS -oj | jq -r .consensus_pubkey.key) = $(arkeod status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "Your key status is ok" || echo -e "Your key status is error"
```
Signing info
```
arkeod q slashing signing-info $(arkeod tendermint show-validator)
```
```
arkeod  tx gov submit-proposal \
--title "" \
--description "" \
--deposit 1000000uarkeo \
--type Text \
--from wallet \
--gas auto --gas-adjustment 1.5 \
-y
```
🗳 Governance
List all proposals
```
arkeod query gov proposals
```
View proposal by id
```
arkeod query gov proposal 1
```
Vote 'Yes'
```
arkeod tx gov vote 78 yes --from wallet --chain-id arkeo --gas auto --gas-adjustment 1.5 -y
```
Vote 'No'
```
arkeod tx gov vote 1 no --from wallet --chain-id arkeo --gas auto --gas-adjustment 1.5 -y
```
Vote 'Abstain'
```
arkeod tx gov vote 1 abstain --from wallet --chain-id arkeo --gas auto --gas-adjustment 1.5 -y
```
Vote 'NoWithVeto'
```
arkeod tx gov vote 1 nowithveto --from wallet --chain-id arkeo --gas auto --gas-adjustment 1.5 -y
```
Remove node
```
sudo systemctl stop arkeod
sudo systemctl disable arkeod
sudo rm /etc/systemd/system/arkeod.service
sudo systemctl daemon-reload
rm -f $(which arkeod)
rm -rf $HOME/arkeod
rm -rf $HOME/.arkeo
rm -rf $HOME/arkeo.sh
```

## Thank to support VNBnode.
### Visit us at:

* <img src="https://user-images.githubusercontent.com/50621007/183283867-56b4d69f-bc6e-4939-b00a-72aa019d1aea.png" width="30"/> <a href="https://t.me/VNBnodegroup" target="_blank">VNBnode Group</a>

* <img src="https://user-images.githubusercontent.com/50621007/183283867-56b4d69f-bc6e-4939-b00a-72aa019d1aea.png" width="30"/> <a href="https://t.me/Vnbnode" target="_blank">VNBnode News</a>

* <img src="https://raw.githubusercontent.com/vnbnode/binaries/main/Logo/VNBnode.jpg" width="30"/> <a href="https://VNBnode.com" target="_blank">VNBnode</a>
