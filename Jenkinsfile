pipeline {

   agent any

   triggers {
       githubPush()
   }



//    environment {

//        SAUCE_CREDS = credentials('sauce-credentials')

//    }


   stages {
       // stage('Print Credentials') {
       //     steps {
       //         echo "Username: $env.SAUCE_CREDS_USR"
       //         echo "Password: $env.SAUCE_CREDS_PSW"
       //     }
       // }

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
               sh """
                   npx playwright test  """
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

//    post {
//        always {
//            echo 'Cleaning up ......'
//            emailext(
//                subject: "🔔 Build Completed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
//                body: "Build has finished (status: ${currentBuild.currentResult}).\nSee ${env.BUILD_URL}",
//                to: 'test@example.com'
//            )
//        }
//        success {
//            echo 'Pipeline completed successfully!'
//            emailext(
//                subject: "✅ SUCCESS:: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
//                body: """<p>Good news! The build succeeded.</p>
//                        <p><a href='${env.BUILD_URL}'>View build logs</a></p>""",
//                mimeType: 'text/html',
//                to: 'test@example.com'
//            )
//        }
//        failure {
//            echo 'Pipeline failed.'
//            emailext(
//                subject: "❌ FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
//                body: """<p>Oops, the build failed.</p>
//                        <p><a href='${env.BUILD_URL}'>View logs</a></p>""",
//                mimeType: 'text/html',
//                to: 'test@example.com'
//            )
//        }
//    }


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



