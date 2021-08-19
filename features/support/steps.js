const pactum = require("pactum");
const { Given, When, Then, Before } = require("@cucumber/cucumber");

let spec = pactum.spec();

Before(() => {
  spec = pactum.spec();
});

Given("I make a GET request to {string}", function (url) {
  spec.get(url);
});

When("I receive a response", async function () {
  await spec.toss();
});

Then("response should have a status {int}", async function (code) {
  spec.response().should.have.status(code);
});

Then("response should have a body {string}", async function (body) {
  spec.response().should.have.json(JSON.parse(body));
});

Then(
  "response in item {int} should have object",
  async function (position, object) {
    spec.response().should.have.jsonLike(`[${position}]`, JSON.parse(object));
  }
);
