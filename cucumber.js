module.exports = {
    default: {
        require: ["./fixtures/world.ts", "./step-definitions/**/*.ts"],
        requireModule: ["ts-node/register"],
        format: ["progress", "json:reports/cucumber-report.json"],
        path: ["./features/**/*.feature"]
    }
}