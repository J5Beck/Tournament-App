(function(views) {

  var join = React.createClass({

    render: function() {
      return (

        <div className="stats">
          <h3 className="tournament_name">All-Childrens Benefit Tournament</h3>
          <ul className="tournment_stats">
            <li className="tournament_name">Tournament Name: All-Childrens Benefit Tournament</li>
            <li className="tournament_location">Location: Lake Kissemmee, Lake Wales, FL</li>
            <li className="tournament_ramp">Ramp Name/Location: Camp Mack Resort Ramp </li>
            <li className="tournament_date">Date: 4/18/2015 </li>
            <li className="tournament_launchtime">Launch Time: First Light</li>
          </ul>
          <button type="home" className="entryformbtn">Submit</button>
        </div>
      )
    }
  });
})(fishing.views);