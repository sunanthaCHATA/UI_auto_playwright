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
        // This installs the browser binaries (doesn't need sudo)
       //  sh 'npx playwright install chromium'  - To only run the tests on Chromium
      
        // This command installs Chromium, Firefox, and Webkit binaries
        sh 'npx playwright install' 
    
        
        // REMOVE the --with-deps line if it's causing sudo errors.
        // Instead, ensure the Linux dependencies are already on the agent.
    }
}

        stage('Execute Tests') {
            steps {
                sh 'npx playwright test tests/test1.spec.ts'
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