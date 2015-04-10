(function(views) {

  var join = React.createClass({

    render: function() {
      return (

        <div className="create_tournament">
          <h3>New Tournament Details</h3>
          <ul className="tournment_details">
            <li className="participant">1 Jeff Beck 23.14lbs </li>
            <li className="participant">2 Name 2 22.14lbs </li>
            <li className="participant">3 Name 3 21.14lbs </li>
            <li className="participant">4 Name 4 20.14lbs </li>
            <li className="participant">5 Name 5 19.14lbs </li>
            <li className="participant">6 Name 6 18.14lbs </li>
            <li className="participant">7 Name 7 17.14lbs </li>
          </ul>
          <button type="submit" className="entryformbtn">Submit</button>
        </div>
      )
    }
  });
})(fishing.views);