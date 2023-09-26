# Forge authorization

This package provides methods for app developers to authorize users and entities (issues, pages, etc.) before making asApp product REST API calls.

## Example usage in Connect
A small adapter around AP.request to get this library working in Connect apps:

```    
    const authorize = authorizeConfluenceWithFetch((url, { body }) => {
        const res = new Promise((resolve) => {
          addon.httpClient(req).post(
            {
              headers: {
                'X-Atlassian-Token': 'no-check',
                'Content-Type': 'application/json',
              },
              url,
              body,
            },
            (err, response, body) => {
              if (err || response.statusCode >= 400) {
                // read response and reject
              } else {
                resolve(JSON.parse(body));
              }
            },
          );
        });
        return res;
      });

    authorize('5c35519ce6047225b6d54c23')
      .onConfluenceContent(309755905)
      .canUpdate()
      .then((checkResult /* true / false */) => {
        // handle
      }
```

The consumer would need to handle errors bubbled up from the fetch helper and the @forge/auth library.
