pipeline {
    agent any
    
    environment {
        DB_HOST = '10.15.0.54'
        DB_PORT = '5432'
        DB_USER = 'qa_test_db_user'
        DB_NAME = 'qa_test_db'
        DB_PASSWORD = credentials('DB_PASSWORD')
        DOTENV_QUIET = 'true' 
        CI = 'true' // Standard practice for Playwright in Jenkins
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Install') {
            steps {
                sh 'npm ci' // 'npm ci' is faster and cleaner for Jenkins than 'npm install'
                sh 'npx playwright install chromium' // Only install what you actually use
            }
        }

        stage('Execute Tests') {
            steps {
                // The --reporter=list or --reporter=line makes logs much cleaner in Jenkins
                sh 'npx playwright test tests/DM_CustomColFunctions/Rank_Tc1.spec.ts --project=chromium --reporter=list'
            }
        }
    }

   post {
    always {
        publishHTML(target: [
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'playwright-report', // Capture the WHOLE folder
            reportFiles: 'index.html',
            reportName: 'Playwright Report'
        ])
    }
}
}