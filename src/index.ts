import app from './app';

import { startConnection } from './database';

const main = async () => {
    const port = app.get('port');
    await startConnection();
    app.listen(port, () => console.log('Server on port', port));
}

main();
