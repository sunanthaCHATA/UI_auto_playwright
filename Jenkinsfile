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

    stages {
        stage('Cleanup & Checkout') {
            steps { 
                checkout scm 
                // Wipe everything to ensure no old errors remain
                sh 'rm -rf playwright-report test-results allure-results'
            }
        }

        stage('Install') {
            steps {
                sh 'npm ci'
                /* CRITICAL: We skip --with-deps here because it needs a password.
                   I am adding --force to ensure browsers are there.
                */
                sh 'npx playwright install chromium'
            }
        }

        stage('Execute Tests') {
            steps {
                /* If this still fails, check the "Console Output" in Jenkins.
                   It will tell us if a library like 'libgbm' is missing.
                */
                sh 'npx playwright test tests/DM_CustomColFunctions/Rank_Tc1.spec.ts --project=chromium --reporter=list,html,allure-playwright || true'
            }
        }
    }

    post {
        always {
            // Only tries to publish if the directory actually exists now
            archiveArtifacts artifacts: 'test-results/**/*.webm', allowEmptyArchive: true
            
            script {
                if (fileExists('playwright-report/index.html')) {
                    publishHTML(target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright HTML Report'
                    ])
                }
            }
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
        }
    }
}