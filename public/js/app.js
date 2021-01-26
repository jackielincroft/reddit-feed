window.addEventListener('load', () => {
    const el = $('#app');
  
    // Compile Handlebar Templates
    const errorTemplate = Handlebars.compile($('#error-template').html());
    const mainTemplate = Handlebars.compile($('#main-template').html());

    // Instantiate api handler
    const api = axios.create({
        baseURL: 'http://localhost:3200/api',
        timeout: 5000,
    });

    const router = new Router({
        mode: 'history',
        page404: (path) => {
          const html = errorTemplate({
            color: 'yellow',
            title: 'Error 404 - Page NOT Found!',
            message: `The path '/${path}' does not exist on this site`,
          });
          el.html(html);
        },
      });

    // Error banner
    const showError = (error) => {
        const { title, message } = error.response.data;
        const html = errorTemplate({ color: 'red', title, message });
        el.html(html);
    };
    
    router.navigateTo(window.location.pathname);

    router.add('/', () => {
        try {
            // Load Posts
            const response = api.get('/NEU/3');
            const { articles } = response.data;

            html = mainTemplate({ articles });

            document.getElementById("articles").innerHTML = JSON.stringify(response.data);

            el.html(html);
        } 
        catch (error) {
            showError(error);
        }
    });

    router.add('/api/:subreddit/:limit', () => {
        try {
            // Load Posts
            const response = api.get('/NEU/3');
            const { articles } = response.data;

            html = mainTemplate({ articles });

            document.getElementById("articles").innerHTML = JSON.stringify(response.data);

            el.html(html);
        } 
        catch (error) {
            showError(error);
        }
    });

});
