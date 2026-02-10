pipeline {
    agent any
    
    environment {
        DB_HOST = '10.15.0.54'
        DB_PORT = '5432'
        DB_USER = 'qa_test_db_user'
        DB_NAME = 'qa_test_db'
        DB_PASSWORD = credentials('DB_PASSWORD')
        DOTENV_QUIET = 'true' 
        CI = 'true'
    }

    stages { // Open stages block ONCE
        
        stage('Checkout') {
            steps { 
                checkout scm 
                // Moved inside steps where it belongs
                sh 'rm -rf playwright-report test-results allure-results'
            }
        }

        stage('Install') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install chromium'
            }
        }

        stage('Execute Tests') {
            steps {
                // Executing with --project=chromium ensures only 1 run
                sh 'npx playwright test tests/DM_CustomColFunctions/Rank_Tc1.spec.ts --project=chromium --reporter=list'
            }
        }
    } // Close stages block ONCE

    post {
        always {
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
        }
    }
}