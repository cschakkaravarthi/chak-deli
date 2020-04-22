pipeline {
  agent any

  stages {
    stage('Deploy DEV') {
      environment {
        DOCKER_REGISTRY = credentials('docker-registry-central-sv')
        VAULT = credentials('vault-central-sv-reader')
        ENV = 'prod'
        CLOUDFRONT_DISTRIBUTION_ID = 'E1UKPZIGZ5LSA1'
      }
      steps {
        copyArtifacts projectName: 'umgc_delivery-build-prod'
        sh """
        ./jenkins/deploy
        """
        archiveArtifacts artifacts: 'docker-image.txt,git.log'
      }
    }
  }
}
