pipeline {
    agent any

    parameters {
        choice(name: 'BROWSER', choices: ['chromium', 'firefox', 'webkit'], description: 'Select browser to run tests')
        choice(name: 'PARALLEL', choices: ['1', '2', '3', '4'], description: 'Number of parallel workers')
        booleanParam(name: 'HEADLESS', defaultValue: true, description: 'Run tests in headless mode')
    }

    environment {
        BROWSER    = "${params.BROWSER}"
        HEADLESS   = "${params.HEADLESS}"
        PARALLEL   = "${params.PARALLEL}"
        REPORT_DIR = "reports"
    }

    tools {
        nodejs 'NodeJS'
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Checking out source code..."
                checkout scm
            }
        }

        stage('Install Dependencies & Browsers') {
            steps {
                echo "Installing npm dependencies..."
                bat 'npm ci'
                echo "Installing Playwright browsers..."
                bat "npx playwright install ${params.BROWSER}"
            }
        }

        stage('Create Report Directories') {        
            steps {
                bat '''
                    if not exist reports\\screenshots mkdir reports\\screenshots
                    if not exist reports\\html-report mkdir reports\\html-report
                '''
            }
        }

        stage('Run Automation Tests') {
            steps {
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {     
                    echo "Running tests on ${params.BROWSER} browser with ${params.PARALLEL} workers..."
                    bat """
                        set BROWSER=${params.BROWSER}
                        set HEADLESS=${params.HEADLESS}
                        set PARALLEL=${params.PARALLEL}
                        npx cucumber-js --parallel ${params.PARALLEL}
                    """
                }
            }
        }

        stage('Generate Report') {
            when {
                expression { return true }    // ← always run this stage
            }
            steps {
                echo "Generating HTML report..."
                bat 'node jenkins-run-tests.js --report-only'
            }
        }

        stage('Publish Report') {
            when {
                expression { return true }    // ← always run this stage
            }
            steps {
                publishHTML(target: [
                    allowMissing         : true,             
                    alwaysLinkToLastBuild: true,
                    keepAll              : true,
                    reportDir            : 'reports/html-report',
                    reportFiles          : 'index.html',
                    reportName           : 'Automation Test Report'
                ])
            }
        }
    }

    post {
        always {
            echo "Archiving reports and screenshots..."
            archiveArtifacts artifacts: 'reports/**/*', allowEmptyArchive: true

            emailext(
                subject: "Playwright Test Automation Report [${params.BROWSER}] - Build #${env.BUILD_NUMBER} - ${currentBuild.currentResult}",
                body: """
                    <html>
                        <body>
                            <h2>Playwright Test Automation Report</h2>
                            <table>
                                <tr><td><b>Project:</b></td><td>${env.JOB_NAME}</td></tr>
                                <tr><td><b>Build Number:</b></td><td>#${env.BUILD_NUMBER}</td></tr>
                                <tr><td><b>Browser:</b></td><td>${params.BROWSER}</td></tr>
                                <tr><td><b>Status:</b></td><td>${currentBuild.currentResult}</td></tr>
                                <tr><td><b>Duration:</b></td><td>${currentBuild.durationString}</td></tr>
                                <tr><td><b>Report URL:</b></td><td><a href="${env.BUILD_URL}reports/html-report/">Click here to view report</a></td></tr>
                                <tr><td><b>Build URL:</b></td><td><a href="${env.BUILD_URL}">${env.BUILD_URL}</a></td></tr>
                            </table>
                            <br/>
                            <p>Please find the attached Test Report for this build.</p>
                        </body>
                    </html>
                """,
                to: 'dhananjay762@gmail.com',
                from: 'dhananjay762@gmail.com',
                mimeType: 'text/html',
                attachmentsPattern: 'reports/html-report/index.html'
            )
        }
        success {
            echo "✅ All tests passed!"
        }
        failure {
            echo "❌ Some tests failed. Check the report for details."
        }
        unstable {
            echo "⚠️ Build is unstable. Some tests may have failed."
        }
        cleanup {
            echo "Cleaning up workspace..."
            cleanWs()
        }
    }
}