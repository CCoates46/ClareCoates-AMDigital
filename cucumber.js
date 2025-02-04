module.exports = {
    default: {
        require: ["./fixtures/world.ts", "./step-definitions/basicSearch/**/*.ts"],
        requireModule: ["ts-node/register"],
        format: ["progress", "json:reports/cucumber-report.json"],
        path: ["./features/**/*.feature"]
    }
}