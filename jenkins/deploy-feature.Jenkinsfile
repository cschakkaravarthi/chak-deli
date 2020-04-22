pipeline {
  agent any

  stages {
    stage('Deploy DEV') {
      environment {
        DOCKER_REGISTRY = credentials('docker-registry-central-sv')
        VAULT = credentials('vault-central-sv-reader')
        ENV = 'dev'
        CLOUDFRONT_DISTRIBUTION_ID = 'E2Y6MMBVPEJ3OW'
      }
      steps {
        copyArtifacts projectName: 'umgc_delivery-feature-specific-build-dev'
        sh """
        ./jenkins/deploy
        """
        archiveArtifacts artifacts: 'docker-image.txt,git.log,git_branch.txt'
      }
    }
  }
}
