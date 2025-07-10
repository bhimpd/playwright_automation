pipeline {

   agent any

   triggers {
       githubPush()
    }


   stages {

       stage('Checkout Code') {
           steps {
               git branch: 'main',
               url: 'https://github.com/bhimpd/playwright_automation'
            }
       }

       stage('Install Dependencies') {
           steps {
               echo 'Installing dependencies...'
               sh 'npm install'
            }
       }

       stage('Run Tests') {
           steps {
               echo 'Running Playwright  tests...'
               sh """npx playwright test --project=chromium"""
           }
       }

       stage('Build') {
           steps {
               echo 'Building project...'
           }
       }

       stage('Deploy') {
           when {
               branch 'main'
           }
           steps {
               echo 'Deploying...'
           }
       }

        stage('Generate HTML Report') {
            steps {
                sh 'npx playwright show-report --viewer'
            }
        }
   }



    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
            junit 'test-results/**/*.xml'
        }
        failure {
            echo '❌ Build Failed!'
        }
        success {
            echo '✅ Build Passed!'
        }
    }

}



