# InterpretAir - 2018 ITM 430 - Capstone

## 0. Install environment build tools:
###### Windows user can use [chocolatey](https://chocolatey.org/docs/installation) to install the tools below
#### Chocolatey
Install with cmd.exe:
```sh
$ @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```
###### Mac user can use [homebrew](https://brew.sh/).
#### Homebrew
```sh
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

#### 1. [Vagrant](https://www.vagrantup.com/downloads.html)
Visit website link above to install and check version:
###### Windows:
```sh
$ chocolatey install vagrant
$ vagrant -v
```
###### Mac:
```sh
$ brew install vagrant
$ vagrant -v
```

#### 2. [Packer](https://www.packer.io/intro/getting-started/install.html "Packer's website")
Visit website link above to install and check version:
###### Windows:
```sh
$ chocolatey install packer
$ packer -v
```
###### Mac:
```sh
$ brew install packer
$ packer -v
```

#### 3. [jq](https://stedolan.github.io/jq/download/)
Visit website link above to install and check version
This will extract json variables specified in *variables.json* in step 3
###### Windows:
```sh
$ chocolatey install jq
$ jq
```
###### Mac:
```sh
$ brew install jq
$ jq
```

*****

### 1. Clone and Configure
Clone this repository (copy/paste and run the command line below)
```sh
$ git clone https://github.com/jwang206/Interpret-Air.git && cd Interpret-Air/packer-vagrant-script/packer
```
Change directory to the packer folder
```sh
$ cd Interpret-Air/packer-vagrant-script/packer
```
Assuming you have generated ssh key with [ssh-keygen](https://confluence.atlassian.com/bitbucketserver/creating-ssh-keys-776639788.html) command in ~/.ssh with default name **id_rsa**, and registered github deploy key with your public ssh key, copy your private ssh key to packer folder and rename it **id_rsa_github_deploy_key**  
 ```sh
$ cp ~/.ssh/id_rsa . && mv id_rsa id_rsa_github_deploy_key
```
****Note: Make sure sensitive files are ignored in .gitignore file.***

Create variables.json file using the template provided (**variables-template.json**)
```sh
$ cp variables-template.json variables.json
```
Edit the *variables.json* file with editor of your choice
```sh
$ nano variables.json
```
Your *variables.json* file should look like the following:
```json5
{
   "database-name":"air-db",
   "database-user-name":"",         /* user-name of your choice for database */
   "database-user-password":"",     /*password for user of database*/
   "database-root-password":"",     /*password for root user of database*/
   "databaseip":"",                 /*master databaseip*/
   "databaseslaveip":"",            /*slave databaseip*/
   "webserverip":"",                /*webserverip*/
   "database-access-from-ip":"127.0.0.1",
   "airdbmastervagrantboxname":"air-db-master",
   "airwsvagrantboxname":"air-ws",
   "airdbslavevagrantboxname":"air-db-slave"
}
```
 As indicated above, don't forget to:
*  Apecify user-name of your choice for database, password for that user of database, password for root user of database. **Note**: name of root user is 'root'
*  Assign IP of webserver, master and slave databaseip

- Overall deploy time: ~ 50 minutes (over an hour in case of timeout or [VBox Manager error](https://github.com/illinoistech-itm/2018-itmt430-5/blob/master/diagrams/Builde%20Error/VBox%20Manager%20error.PNG))

### 2. Build slave/master database and webserver in packer folder
1. Build the slave database and add to vagrant box
```sh
$ packer build --var-file=./variables.json air-db-slave-ubuntu17101.json
...
$ vagrant box add ../build/Air-DB-Slave-virtualbox-[replace with your timestamp].box --name air-db-slave
```

2. Build the master database and add master database to vagrant box
```sh
$ packer build --var-file=./variables.json air-db-master-ubuntu17101.json
...
$ vagrant box add ../build/Air-DB-Master-virtualbox-[replace with your timestamp].box --name air-db-master
```

3. Build the webserver and add webserver to vagrant box
```sh
$ packer build --var-file=./variables.json air-ws-ubuntu17101.json
...
$ vagrant box add ../build/Air-WS-virtualbox-[replace with your timestamp].box --name air-ws
```

### 3. Vagrant up slave/master database and webserver
```sh
$ cd ../build/air-ws
$ vagrant up --provision
```

### 4. Open link in console
![Openlinkimage](https://github.com/illinoistech-itm/2018-itmt430-5/blob/master/diagrams/Project%20Readme%20images/openlink.PNG "Openlink")
---
# Project Milestones
![Milestones](https://github.com/illinoistech-itm/2018-itmt430-5/blob/master/diagrams/Project%20Timeline/milestones.PNG "Milestones")
