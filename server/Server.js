export default class Server 
{
	constructor()
	{
		this.conns = [];
	}

	// registers new connection
	add(conn) 
	{
		this.conns.push(conn);

		for(const conn of this.conns)
  		conn.send('stat', this.conns.length);
	}

	// removes the connection
	remove(conn)
	{
		this.conns = this.conns.filter(c => c != conn);
		for(const conn of this.conns)
			conn.send('stat', this.conns.length);
	}
}
