pipeline {
  agent any
  stages {
    stage('Build') { 
      steps {
          sh 'npm install pnpm -g'
          sh 'pnpm install'
      }
    }
  }
}