pipeline {
  agent any

  stages {
    stage('Deploy UAT') {
      environment {
        DOCKER_REGISTRY = credentials('docker-registry-central-sv')
        VAULT = credentials('vault-central-sv-reader')
        ENV = 'uat'
        CLOUDFRONT_DISTRIBUTION_ID = 'E2N58RRGB4D3HM'
      }
      steps {
        copyArtifacts projectName: 'umgc_delivery-build-uat'
        sh """
        ./jenkins/deploy
        """
        archiveArtifacts artifacts: 'docker-image.txt,git.log'
      }
    }
  }
}
