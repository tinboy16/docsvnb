# Zora

![image](https://github.com/vnbnode/VNBnode-Guides/assets/76662222/6b929509-36ce-4a08-95cc-664555bafce5)

## Hardware requirements

|   Thông số  |        Khuyến nghị        |
| :---------: | :-----------------------: |
|   **CPU**   |        ≥ 4 Cores          |
|   **RAM**   |        ≥ 8 GB             |
|   **SSD**   |        ≥ 200 GB           |

## Set up RPC in Alchemy
### Create an account on Alchemy
Use your Gmail to register an account here: [https://www.alchemy.com/](https://alchemy.com/?r=d9e42f283d9e2fbe)
- NOTE: `Select FREE and do not add any VISA cards to your Alchemy account`
### Create Zora app
Create the Zora app on the Ethereum mainnet

![image](https://github.com/vnbnode/VNBnode-Guides/assets/76662222/7fd3e7ad-f373-4a41-bade-566c76dfd7db)


Get API keys information for both Ethereum and Optimism.

![image](https://github.com/vnbnode/VNBnode-Guides/assets/76662222/5b09e0a2-3651-4bd3-9e05-44c80d8f3239)

![image](https://github.com/vnbnode/VNBnode-Guides/assets/76662222/88c369ad-5bc6-48bd-91ed-8363970fe293)

- Please copy both the Ethereum mainnet APIs to prepare for the next step
## Run Zora Node
### 1. Update
```
sudo apt-get update && sudo apt-get upgrade -y
sudo apt install curl build-essential git screen jq pkg-config libssl-dev libclang-dev ca-certificates gnupg lsb-release -y
```
### 2. Download Source
```
git clone https://github.com/conduitxyz/node.git 
cd node
./download-config.py zora-mainnet-0
export CONDUIT_NETWORK=zora-mainnet-0
cp .env.example .env 
```
### 3. Edit .env
```
nano .env
```

![image](https://github.com/vnbnode/VNBnode-Guides/assets/76662222/14852f3c-3a5d-492a-836a-186844460fb0)

![image](https://github.com/vnbnode/VNBnode-Guides/assets/76662222/1e8a1366-b585-4553-9854-19e5f886c05b)

Ctrl + X : Save

### 4. Run Node
```
docker compose up --build
```
### 5. Auto Restart
```
docker update --restart=unless-stopped node-node-1
docker update --restart=unless-stopped node-geth-1
```
### 6. Check logs
```
docker logs -f node-node-1
docker logs -f node-geth-1
```
## Thank to support VNBnode.
### Visit us at:

* <img src="https://user-images.githubusercontent.com/50621007/183283867-56b4d69f-bc6e-4939-b00a-72aa019d1aea.png" width="30"/> <a href="https://t.me/VNBnodegroup" target="_blank">VNBnode Group</a>

* <img src="https://user-images.githubusercontent.com/50621007/183283867-56b4d69f-bc6e-4939-b00a-72aa019d1aea.png" width="30"/> <a href="https://t.me/Vnbnode" target="_blank">VNBnode News</a>

* <img src="https://raw.githubusercontent.com/vnbnode/binaries/main/Logo/VNBnode.jpg" width="30"/> <a href="https://VNBnode.com" target="_blank">VNBnode</a>

