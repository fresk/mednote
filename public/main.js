/** @jsx React.DOM */

var React = require('react');

var RECORD = require('./record.html')



var App = React.createClass({

            getInitialState: function() {
                return {
                    content: RECORD
                };
            },


            render: function() {
                return ( < div dangerouslySetInnerHTML = {
                        {
                            __html: this.state.content
                        }
                    }
                    />
            );
    }
});


React.renderComponent(<App></App > , root);




                /*

var MarkdownEditor = React.createClass({
    getInitialState: function() {
        return {
            value: "hello"
        };
    },

    render: function() {
        console.log(require('./index.md'));
        return (require('./index.md'));
    }
});


console.log("HELLO!!!!!!!");

*/