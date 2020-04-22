pipeline {
  agent any

  stages {
    stage('Deploy DEV') {
      environment {
        DOCKER_REGISTRY = credentials('docker-registry-central-sv')
        VAULT = credentials('vault-central-sv-reader')
        ENV = 'qa'
        CLOUDFRONT_DISTRIBUTION_ID = 'E22FUJR6FBEVOX'
      }
      steps {
        copyArtifacts projectName: 'umgc_delivery-build-dev'
        sh """
        ./jenkins/deploy
        """
        archiveArtifacts artifacts: 'docker-image.txt,git.log'
      }
    }
  }
}
