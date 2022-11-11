import React, { Component } from 'react';

class Courses extends Component {

   constructor(){
       super();
       this.state = {
           data: ["math", "science"],
       };
   } //end constructor

   bindDropDowns() {
       var courseName = document.getElementById('title').value

       for(var i=0; i < this.state.data.length; i++) {
        var courseName = this.state.data[i].title;
       }
   }

   componentWillMount() {
    fetch('http://sis.rutgers.edu/oldsoc/courses.json?subject=198&semester=12022&campus=NB&level=UG', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        /*body: JSON.stringify({
            username: '{userName}',
            password: '{password}'
        })*/
    }) /*end fetch */
    .then(results => results.json()) 
    .then(data => this.setState({ data: data })   
)

} //end life cycle

    render() {
        console.log(this.state.data);
        return (
            <div>


                <form>
                {/* <div>
   <select className="custom-select" id="clientName" onSelect="bindDropDowns()">
      this.state.data.map((obj) => <option key={obj.clientName}>{obj.clientName}</option>
      );
   </select>
</div> */}

                {/* <div>
  {['clientName', 'siteName', 'segmentName'].map(key => (
    <select key={key}>
      {this.state.data.map(({ [key]: value }) => <option key={value}>{value}</option>)}
    </select>
  ))}
</div> */}
                    {/* <div>

                        <h2>Memeber Selection:</h2>

                        <div>

                            <div>
                                <select className="custom-select" id="courseName" onSelect="bindDropDowns()">
                                <option selected>Client</option>
                                </select>     
                            </div><br />

                            <div>
                                <select className="custom-select" id="siteName">
                                <option selected>Site Building Name</option>
                                </select>
                            </div><br />
                            <div>
                                <select className="custom-select" id="segmentName">
                                <option selected>Segments</option>
                                </select>
                            </div><br />
                           <div>
                                <label for="example-text-input">Modify CFM Rate Factor:</label>
                                <input class="form-control" type="textbox"  id="cfmRateFactor" value="10" />
                            </div><br />
                                <div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </div>
                    </div> */}
                    </form>
            </div>


        );
      }
}

export default Courses