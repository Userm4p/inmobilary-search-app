# PowerShell script to run tests with code coverage
Write-Host "Running tests with code coverage..." -ForegroundColor Green

# Build the solution
Write-Host "Building solution..." -ForegroundColor Yellow
dotnet build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

# Run tests with code coverage
Write-Host "Running tests with code coverage..." -ForegroundColor Yellow
dotnet test --collect:"XPlat Code Coverage" --results-directory ./TestResults --logger trx --settings coverlet.runsettings

if ($LASTEXITCODE -ne 0) {
    Write-Host "Tests failed!" -ForegroundColor Red
    exit 1
}

# Generate coverage report
Write-Host "Generating coverage report..." -ForegroundColor Yellow
$coverageFile = Get-ChildItem -Path "./TestResults" -Filter "coverage.cobertura.xml" -Recurse | Select-Object -First 1

if ($coverageFile) {
    Write-Host "Coverage report generated at: $($coverageFile.FullName)" -ForegroundColor Green
    Write-Host "You can open this file in Visual Studio or use reportgenerator to create an HTML report" -ForegroundColor Cyan
} else {
    Write-Host "Coverage file not found!" -ForegroundColor Red
}

Write-Host "Test run completed!" -ForegroundColor Green
