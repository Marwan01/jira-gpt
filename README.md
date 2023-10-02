# Forge GPT Extra details
Devpost: 

https://devpost.com/software/jira-descriptor

Demo:
<img width="1437" alt="Screenshot 2023-09-27 at 12 57 06 AM" src="https://github.com/Marwan01/codegeist/assets/25825598/44325d99-e639-4b34-ac86-b164fd89311e">

This project contains a Forge app written in Javascript that displays `Hello World!` in a Jira issue panel. 

See [developer.atlassian.com/platform/forge/](https://developer.atlassian.com/platform/forge) for documentation and tutorials explaining Forge.

## Requirements

See [Set up Forge](https://developer.atlassian.com/platform/forge/set-up-forge/) for instructions to get set up.

## Quick start

- Modify your app by editing the `src/index.jsx` file.


Set OpenAI API key as environment variable. An OpenAI API key which you can obtain from OpenAI website. You can find your Secret API key in your User settings. Please make sure you have enough credit balance to make these OpenAI API calls:

```
forge variables set --encrypt OPEN_API_KEY your-key
```

- Build and deploy your app by running:
```
forge deploy
```

- Install your app in an Atlassian site by running:
```
forge install
```

- Develop your app by running `forge tunnel` to proxy invocations locally:
```
forge tunnel
```

### Notes
- Use the `forge deploy` command when you want to persist code changes.
- Use the `forge install` command when you want to install the app on a new site.
- Once the app is installed on a site, the site picks up the new app changes you deploy without needing to rerun the install command.

## Support

See [Get help](https://developer.atlassian.com/platform/forge/get-help/) for how to get help and provide feedback.
