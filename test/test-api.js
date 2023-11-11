let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('/Configure', () => {
  it('check routes and client has all mandatory field', (done) => {
    header = {
      client_id: 1,
    };
    let req = {
      routes: [
        {
          sourcePath: '/items',
          destinationUrl: 'https://example.com/items',
        },
      ],
      clients: [
        {
          clientId: '1234',
          limit: 1000,
          seconds: 10,
        },
      ],
    };
    chai
      .request(app)
      .post('/configure')
      .set(header)
      .send(req)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('check if routes has missing fields - sourcePath', (done) => {
    header = {
      client_id: 1,
    };
    let req = {
      routes: [
        {
          destinationUrl: 'https://example.com/items',
        },
      ],
      clients: [
        {
          clientId: '1234',
          limit: 1000,
          seconds: 10,
        },
      ],
    };
    chai
      .request(app)
      .post('/configure')
      .set(header)
      .send(req)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('check if routes has missing fields - destinationUrl', (done) => {
    header = {
      client_id: 1,
    };
    let req = {
      routes: [
        {
          sourcePath: '/items',
        },
      ],
      clients: [
        {
          clientId: '1234',
          limit: 1000,
          seconds: 10,
        },
      ],
    };
    chai
      .request(app)
      .post('/configure')
      .set(header)
      .send(req)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('check if client has missing fields', (done) => {
    header = {
      client_id: 1,
    };
    let req = {
      routes: [
        {
          sourcePath: '/items',
          destinationUrl: 'https://example.com/items',
        },
      ],
      clients: [
        {
          limit: 1000,
          seconds: 10,
        },
      ],
    };
    chai
      .request(app)
      .post('/configure')
      .set(header)
      .send(req)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('check client has missing non mandatory fields', (done) => {
    header = {
      client_id: 1,
    };
    let req = {
      routes: [
        {
          sourcePath: '/items',
          destinationUrl: 'https://example.com/items',
        },
      ],
      clients: [
        {
          clientId: '1234',
          // limit: 1000,
          // seconds: 10,
        },
      ],
    };
    chai
      .request(app)
      .post('/configure')
      .set(header)
      .send(req)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('check the header is set', (done) => {
    let req = {
      routes: [
        {
          sourcePath: '/items',
          destinationUrl: 'https://example.com/items',
        },
      ],
      clients: [
        {
          clientId: '1234',
          limit: 1000,
          seconds: 10,
        },
      ],
    };
    header = {
      client_id: 1,
    };
    chai
      .request(app)
      .post('/configure')
      .set(header)
      .send(req)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('check the header is not set', (done) => {
    let req = {
      routes: [
        {
          sourcePath: '/items',
          destinationUrl: 'https://example.com/items',
        },
      ],
      clients: [
        {
          clientId: '1234',
          limit: 1000,
          seconds: 10,
        },
      ],
    };

    chai
      .request(app)
      .post('/configure')
      .send(req)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});

describe('/items', () => {
  it('check req.url is same as sourcePath', (done) => {
    chai
      .request(app)
      .get('/items')
      .send()
      .end((err, res) => {
        res.should.have.status(302);
        done();
      });
  });
  it('check req.url is same as sourcePath', (done) => {
    chai
      .request(app)
      .get('/itemss')
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
