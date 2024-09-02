const { Storage } = require('megajs')
const KiloBytes = 1024;
const MegaBytes = KiloBytes * KiloBytes;
const GigaBytes = KiloBytes * KiloBytes * KiloBytes;

// Node doesn't support top-level await when using CJS
;(async function () {
    console.log('Mega Authentication is starting...');
    const storage = new Storage({
      email: 'grapeware0@gmail.com',
      password: '0123456789grapeware',
    })
    console.log('Trying to connect to MEGA...');
    // Will resolve once the user is logged in
    // or reject if some error happens
    await storage.ready
    console.log('Successfully connected');

    const info = await storage.getAccountInfo();

    console.log(`Total Space: ${info.spaceTotal / GigaBytes} GigaBytes`);
    console.log(`Used Space: ${info.spaceUsed / GigaBytes} GigaBytes`);
    const rootChildren = storage.root.children;
    for (const child of rootChildren){
      console.log(`- ${child.name} (${child.type}) IsFolder: (${child.directory}) - Size: ${parseFloat(child.size / MegaBytes)} MB`);
    }
    
    /*const file = await storage.upload({
      name: 'hello-world.txt'
    }, 'Hello world! I..........m GiroZetto').complete;
    console.log('The file was uploaded!'); */
    process.exit(1)
}()).catch(error => {
  console.error(error)
  process.exit(1)
})
