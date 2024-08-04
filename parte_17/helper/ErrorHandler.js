class ErrorHandler extends Error {
  constructor(statusCode, message) 
  {
        super();
        this.statusCode = statusCode;
        this.handle();
  }

  handle()
  {
    switch(this.statusCode)
    {
        case 400:
            this.badRequest();
            break;
        case 404:
            this.notFound();
            break;
        case 500:
            this.serverError();
            break;
        default:
            this.message = `${this.message || 'Errore Interno!'}`;
            break;
    }
  }

  badRequest() 
  {
    this.message = `${this.message || 'Richiesta non valida'}`;
  }
  notFound()
  {
    this.message = `${this.message || 'Risorsa non trovata'}`;
  }
  serverError()
  {
    this.message = `${this.message || 'Errore interno del server'}`;
  } 
}

module.exports = ErrorHandler;