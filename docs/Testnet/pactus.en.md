# Pactus

## GUI Windows, Ubuntu Desktop, MacOS
    
[LINK HERE](https://pactus.org/download/)

![image](https://github.com/vnbnode/VNBnode-Guides/assets/76662222/a141b8b1-cffb-491a-b9c5-0a979c2a9571)

## Ubuntu (Docker)

## Option 1: Automatic
```
cd $HOME && source <(curl -s https://raw.githubusercontent.com/vnbnode/binaries/main/Projects/Pactus/pactus-auto.sh)
```
## Option 2: Manual
### Install Docker
```
sudo apt update && sudo apt upgrade -y
sudo apt-get update
sudo apt-get install \
ca-certificates \
curl \
gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo \
"deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
"$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
### 1/ Pull image Pactus
```
docker pull pactus/pactus
```
### 2/ Create new wallet
```
docker run -it --rm -v ~/pactus:/root/pactus pactus/pactus pactus-daemon init
```
- Select: Y
- Save wallet seed

![image](https://github.com/vnbnode/VNBnode-Guides/assets/76662222/c3651ee4-d555-42c3-9a06-5bffc3323aed)
- Number of Validators: 1

![image](https://github.com/vnbnode/VNBnode-Guides/assets/76662222/43eae9e2-d9ae-4130-ae4f-93a3e927edbc)
- Save Validator Address and Reward Address

![image](https://github.com/vnbnode/VNBnode-Guides/assets/76662222/bc1283c6-cb91-4236-8789-16dcc5694290)

### 3/ If you already have a seed wallet, Recovery wallet
```
docker run -it --rm -v ~/pactus:/root/pactus pactus/pactus pactus-daemon init --restore "Fill 12 seed word of you"
```
### 4/ Run node
```
docker run -it -d -v ~/pactus:/root/pactus --network host --name pactus pactus/pactus pactus-daemon start --password <WALLET_PASSWORD>
```
### 5/ [Faucet Here](https://discord.gg/pactus-795592769300987944)
- Wait synced
- Command: faucet (address)

![image](https://github.com/vnbnode/VNBnode-Guides/assets/76662222/aac4d155-2416-4483-b784-34bda758f605)

### 6/ Check version
```
docker exec -it pactus pactus-daemon version
```
### 7/ Check log node
```
docker logs pactus -f
```

## Update Pactus

### 1/ Stop node
```
docker stop pactus
```
### 2/ Remove node
```
docker rm pactus
```
### 3/ Update new version
```
docker pull pactus/pactus
```
### 4/ Run node
```
docker run -it -d -v ~/pactus:/root/pactus --network host --name pactus pactus/pactus pactus-daemon start --password <WALLET_PASSWORD>
```
### 5/ Check version
```
docker exec -it pactus pactus-daemon version
```
### 6/ Check log node
```
docker logs pactus -f
```
## Thank to support VNBnode.
### Visit us at:

* <img src="https://user-images.githubusercontent.com/50621007/183283867-56b4d69f-bc6e-4939-b00a-72aa019d1aea.png" width="30"/> <a href="https://t.me/VNBnodegroup" target="_blank">VNBnode Group</a>

* <img src="https://user-images.githubusercontent.com/50621007/183283867-56b4d69f-bc6e-4939-b00a-72aa019d1aea.png" width="30"/> <a href="https://t.me/Vnbnode" target="_blank">VNBnode News</a>

* <img src="https://raw.githubusercontent.com/vnbnode/binaries/main/Logo/VNBnode.jpg" width="30"/> <a href="https://VNBnode.com" target="_blank">VNBnode</a>
