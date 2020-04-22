pipeline {
  agent any
  options { timestamps () }
  
  stages {
    stage('Build') {
      environment {
        DOCKER_REGISTRY = credentials('docker-registry-central-sv')
        VAULT = credentials('vault-central-sv-reader')
      }
      steps {
        script{
          currentBuild.description = "Branch: $GIT_BRANCH"
          }
        sh """
        ./jenkins/build
        """
        archiveArtifacts artifacts: 'docker-image.txt,git.log,git_branch.txt'
      }
    }
  }
}
