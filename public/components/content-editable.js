var ContentEditable = React.createClass({
    displayName: 'ContentEditable',
    render: function () {
        return React.DOM.div({
            onInput: this.emitChange,
            onBlur: this.emitChange,
            contentEditable: true,
            dangerouslySetInnerHTML: {
                __html: this.props.html
            }
        });
    },
    componentWillUpdate: function(nextProps) {
        if (nextProps.html !== this.getDOMNode().innerHTML) {
            this.getDOMNode().innerHTML = nextProps.html;
        }
    },
    shouldComponentUpdate: function (nextProps) {
        if (nextProps.html !== this.getDOMNode().innerHTML) {
            return true;
        }
        return false;
    },
    emitChange: function () {
        var html = this.getDOMNode().innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {

            this.props.onChange({
                target: {
                    value: html
                }
            });
        }
        this.lastHtml = html;
    }
});


module.exports = ContentEditable;