# Drupal and Astro: Umami Demo

Umami headless application with Drupal and Astro demo.

Creator: Vincenzo Gambino [GitHub](https://github.com/VincenzoGambino), [LinkedIn](https://www.linkedin.com/in/gambinovincenzo/)

Main Collaborator: Francesco Battaglia [GitHub](https://github.com/Cicciobat), [LinkedIn](https://www.linkedin.com/in/cicciobattaglia/)

Reviewer: Christopher Pecoraro [GitHub](https://github.com/chrispecoraro/), [LinkedIn](https://www.linkedin.com/in/chrispecoraro/)

# Prerequisites
An Astro project (Already included in this repo) - If you don’t have an Astro project yet, this [Installation guide](https://docs.astro.build/en/install/auto/) will get you up and running in no time.

A Drupal project (Already included in this repo) - If you don't have a local Drupal project yet, this [Installation guide](https://ddev.readthedocs.io/en/latest/users/quickstart/#__tabbed_2_1) will get you up and running in no time. This project uses ddev as a local development environment.

## Drupal

Drupal basic configuration and extra packages.

### Extra packages (Already included in this repo)

- drupal/jsonapi_extras
- drupal/jsonapi_image_styles
- drupal/jsonapi_menu_items
- drupal/jsonapi_resources
- drupal/jsonapi_views
- drupal/restui

### Installation

If you are using ddev, go inside the umami-drupal folder with your terminal and run the following commands:

| Command                                          | Action                           |
|:-------------------------------------------------|:---------------------------------|
| `ddev start`                                      | Start the ddev server            |
| `ddev composer install`                           | Install the Drupal packages      |
| `ddev drush si demo_umami ddev drush site:install --account-name=admin --account-pass=admin -y` | Installs the Umami demo profile. |
| `ddev drush en jsonapi_extras jsonapi_image_styles jsonapi_menu_items jsonapi_resources jsonapi_views restui -y` | Installs the extra packages.     |
| `ddev drush uli`                                 | Gives you a one-time login link. |

Now, the Drupal application will be visible at [https://drupal-umami.ddev.site/](https://drupal-umami.ddev.site/)

## Astro

Astro configuration and extra packages.

### Extra Packages (Already included in this repo)

- Drupal Related packages
    - drupal-jsonapi-params
    - jsona

- Theming
    - tailwindcss
    - @astrojs/tailwind
    - @tailwindcss/aspect-ratio
    - @tailwindcss/forms
    - @tailwindcss/typography
    - autoprefixer
    - postcss
    - sharp

### Configuration
Copy the `example.env` file and rename it `.env`. Update the environment variable `DRUPAL_BASE_URL` with your Drupal base URL. If you are using ddev and this repo Drupal app, you don't need to change it.

### Installation

To install Astro, go inside the `astrojs` folder and run the following commands:

| Command         | Action                                      |
| :--------------  | :------------------------------------------ |
| `npm install`   | Installs dependencies                       |
| `npm run dev`   | Starts local dev server at `localhost:4321` |

The Astro app should now be visible at [http://localhost:4321/](http://localhost:4321/)
