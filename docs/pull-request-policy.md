# Pull Request Policy

Code review is a very important part of the software development cycle. Pull requests are used to review code on branches before it reaches the master. Code review is also one of the most difficult and time-consuming parts of the software development process, often requiring experienced team members to spend time reading, thinking, evaluating, and responding to implementations of new features or systems.

We have been inspired by the set of rules and templates that [Codica](https://github.com/codica2) team has developed and this page briefly explains the steps that a pull request usually follows.

## General

- Always use our [Pull Request templates for GitHub](https://help.github.com/en/articles/creating-a-pull-request-template-for-your-repository) for the repository you're working with.
- In the PR title use tags `[Bugfix]`, `[Feature]`, `[Hotfix]`, `[Refactor]`

  Example:

  ```text
  [Bugfix] Sitemap bug solved.
  ```

- PR description must include:
  - Jira ticket URL;
  - PR explanation and what it does;
  - Test flox;
  - Type of change;
  - Checklist;
- Always set a checkbox `Remove source branch when merge request is accepted.`
- PR must have at least two reviewers and one assignee
- Use `label` to tag PR

## Automate Pull Request Validation

- Be sure to configure [DangerJS](https://danger.systems/js/) token to check the validity of your PRs locally

You must have at least:

- Prefix in MR title;
- Ticket link;
- Description;
- Assignee;
- Labels;
- Changelog updated;
- Two reviewers.

We explain in the main `README.md` how to use [DangerJS](https://danger.systems/ruby/) locally and provide a settings example.

## One ticket = One Pull Request

- One PR must contain changes corresponding to a single ticket;
- In case when several tickets depend on each other, it makes sense to combine them into one.

## Code Requirements

- Be sure to cover your code with tests;
- If your code affects the launch, testing or deployment of the application, be sure to update the `README.md`.
