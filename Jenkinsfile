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
        stage('Checkout') {
            steps { 
                checkout scm 
                // 1. CLEAN: Remove old results so you don't get "ghost" data
                sh 'rm -rf playwright-report test-results allure-results'
            }
        }

        stage('Install') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install chromium --with-deps'
            }
        }

        stage('Execute Tests') {
            steps {
                /* 2. RUN ONCE: Use the config file which ALREADY has both reporters.
                   Adding --reporter=list here ensures you see progress in the Jenkins console
                   without breaking the other reporters in your config. */
                sh 'npx playwright test tests/DM_CustomColFunctions/Rank_Tc1.spec.ts --config=playwright.config.ts --project=chromium --reporter=list,line'
            }
        }
    }

    post {
        always {
            // 3. PUBLISH BOTH: Ensure these paths match your playwright.config.ts
            
            // This captures the 'playwright-report' folder
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
            
            // This captures the 'allure-results' folder
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
        }
    }
}