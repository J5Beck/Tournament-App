(function(views) {

  var entry = React.createClass({

    render: function() {
      return (

      <div className="entry">
        <div className="username">
          <form className="entryform">
            <label>Checkin Time:  </label><input type="time" name="checkintime"/><br/>
            <label>Total Fish:  </label><input type="number" name="totalfish"/><br/>
            <label>Total Wieght: </label><input type="number" name="totalwieght"/><br/>
            <label>Dead Fish: </label><input type="checkbox" name="deadfish" value="yes"/>Yes  <input type="checkbox" name="deadfish" value="no"/>No<br/>
            <label>Big Fish Wieght: </label><input type="" name="totalwieght"/><br/>
            <button type="submit" className="entryformbtn">Submit</button>
          </form>
        </div>    
      </div>
      )
    }
  });
})(fishing.views);