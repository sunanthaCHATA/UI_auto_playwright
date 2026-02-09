pipeline {
    agent any
    
    environment {
        // Map Jenkins credentials to the names your dbUtils.ts expects
        DB_HOST = '127.0.0.1' // Or your remote DB IP
        DB_PORT = '5432'
        DB_USER = 'automation_user'
        DB_NAME = 'qa_test_db'
        // This pulls the secret from Jenkins Credential Store
        DB_PASSWORD = credentials('DB_PASSWORD') 
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Execute Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            // Archive reports so you can see them in Jenkins
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
        }
    }
}