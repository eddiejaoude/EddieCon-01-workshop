Feature: example

    Scenario: Check root path
        Given I make a GET request to "http://localhost:3000"
        When I receive a response
        Then response should have a status 200
        And response should have a body "{\"name\":\"hello world!\"}"

    Scenario: Get members
        Given I make a GET request to "http://localhost:3000/members"
        When I receive a response
        Then response should have a status 200
        And response in item 0 should have object
            """
            {
                "name": "Eddie Jaoude",
                "github": "eddiejaoude"
            }
            """
        And response in item 1 should have object
            """
            {
                "name": "Sara Jaoude",
                "github": "sarajaoude"
            }
            """
