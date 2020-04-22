def project = "umgc_delivery"
def sedCommand = ""
def deployment = "delivery"
def buildCommand = ""



pipeline {
  agent any
  environment {
      DOCKER_REG    = credentials('docker-registry-central-sv')
      VAULT_REG     = credentials('vault-central-sv-reader')  
      NODE_ENV      = 'production'
      VAULT_ADDR    = 'https://vault.umusic.net'
      VAULT_BASE    = 'umg-central/umgc_delivery/'
      VAULT_METHOD  = 'userpass'      
  }


  stages {

    stage('Trace Environment Vars') {
      steps {
          sh "env"
      }    
    }
        
    stage('Build Docker Image') {
      steps {     

          script {

            if( "$GIT_BRANCH".contains('master' ) )              
              ENV = 'prod'
            else if( "$GIT_BRANCH".contains('release' ) )               
              ENV = 'uat'
            else              
              ENV = 'qa'
                          

            VAULT_PATH =  "$VAULT_BASE$ENV"
            sedCommand =  "s,${project}\$,${project}:${env.GIT_COMMIT},g"
            buildCommand = "docker build ." 
            buildCommand +=  " --build-arg ENV=$ENV" 
            buildCommand +=  " --build-arg NODE_ENV=$NODE_ENV"  
            buildCommand +=  " --build-arg VAULT_USER=$VAULT_REG_USR" 
            buildCommand +=  " --build-arg VAULT_PASS=$VAULT_REG_PSW" 
            buildCommand +=  " --build-arg VAULT_METHOD=$VAULT_METHOD" 
            buildCommand +=  " --build-arg VAULT_ADDR=$VAULT_ADDR" 
            buildCommand +=  " -t docker-registry.umusic.com/central/${project}:${env.GIT_COMMIT}"
          }

          sh buildCommand

      }
    }
    
    stage('Push Docker Image') {
      steps {
          sh "docker login -u ${env.DOCKER_REG_USR} -p ${env.DOCKER_REG_PSW} docker-registry.umusic.com"
          sh "docker push docker-registry.umusic.com/central/${project}:${env.GIT_COMMIT}"
      }
    }
    
    stage('Deploy to Environment based on Branch') {           
      steps {
        
        
        echo "Deploying the build to ${ENV}"
        
        sh "sed -e $sedCommand -e 's,docker-registry.umusic.com,docker-registry.umusic.net,g' docker-compose.yml > docker-compose.yml.tmp && mv docker-compose.yml.tmp docker-compose.yml" 
        sh 'cat docker-compose.yml'
        
        sh "aws s3 cp docker-compose.yml s3://aws58-devops/${ENV}/${deployment}/"

        //sleep(300)
        //build 
      }
    }


    stage('Deploy QA release to UAT based on Release TAG') {     
      when {
        tag "release/*"
      }
      steps {
        echo "Deploying to UAT URL only"
        
        sh "sed -e $sedCommand -e 's,docker-registry.umusic.com,docker-registry.umusic.net,g' docker-compose.yml > docker-compose.yml.tmp && mv docker-compose.yml.tmp docker-compose.yml" 
        sh 'cat docker-compose.yml'

        sh "aws s3 cp docker-compose.yml s3://aws58-devops/${ENV}/${deployment}/"
        //sleep(300)

      }
    }

  }
}
