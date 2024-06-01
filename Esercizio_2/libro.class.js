const events = require('events');   

class Libro
{
    constructor(titolo, autore)
    {
        this.titolo = titolo;
        this.autore = autore;
        this.prestito = false;
        this.reso = false;
    }
    
}

class LibroCollection extends events.EventEmitter {
    
    collection = [];
    
    constructor() {
        super();
        this.collection.push(new Libro('Il Signore degli Anelli', 'J.R.R. Tolkien'));
    }

    //Da eseguire prima delle azioni
    fetchCollection()
    {
        //API per recuperare la collection
        this.emit('fetchCollection', this.collection);
    }
    //Da eseguire dopo le azioni
    saveCollection()
    {
        //API per salvare la collection
        this.emit('saveCollection', this.collection);
    }
    getLibro(titolo) 
    {
        this.emit('getlibro', { titolo: 'Il Signore degli Anelli', autore: 'J.R.R. Tolkien' });
    }
    getLibri()
    {
        this.emit('getlibri', this.collection);
    }
    addLibro(libro)
    {
        this.emit('addLibro', libro);
    }
    modLibro(libro) 
    {
        this.emit('modLibro', libro);
    }
    delLibro(libro)
    {
        this.emit('delLibro', libro);
    }

}

class actionLib extends events.EventEmitter {

    libro = new Libro('Il Signore degli Anelli', 'J.R.R. Tolkien');
    
    constructor() {
        super();
    }

    //Da eseguire prima delle azioni
    fetch(titolo)
    {
        //API per recuperare il libro
        this.emit('fetch', this.libro);
    }
    //Da eseguire dopo le azioni
    save()
    {
        //API per salvare il libro
        this.emit('save', this.libro);
    }
    prestito(libro)
    {
        this.emit('prestito', this.libro);
    }
    reso()
    {
        this.emit('reso', this.libro);
    }
    info()
    {
        this.emit('info', this.libro);
    }
}

