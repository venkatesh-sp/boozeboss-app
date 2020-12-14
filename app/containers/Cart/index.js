import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, InputGroup, InputNumber } from 'rsuite';

const StyledCartDiv = styled.div`
  width: 100%;
  padding: 0px 20px;
  height: 90vh;
  position: relative;
`;

const StyledMenuDiv = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
`;

const StyledCartItemDiv = styled.div`
  width: 100%;
  background-color: #ffffff;
  padding: 6px 12px;
  border-radius: 8px;
  margin-top: 16px;
`;
const StyledText = styled.p`
  font-size: ${props => props.size};
  font-weight: ${props => props.weight};
  color: ${props => props.color};
`;
const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;
const ButtonStyles = {
  width: '100%',
  position: 'absolute',
  bottom: '0px',
  left: '0',
  backgroundColor: '#3498ff',
  borderRadius: '8px',
  padding: '5px 10px',
  text: 'center',
};

export default class Cart extends Component {
  state = {
    cartItems: '',
    outlet: '',
    currentoutlet: '',
  };

  componentDidMount() {
    const { state } = this.props.location;
    if (state) {
      const { currentoutlet, outlet, cartItems } = state;
      this.setState({ currentoutlet, outlet, cartItems });
    }
  }

  render() {
    const { outlet, cartItems } = this.state;

    if (!outlet && !cartItems) {
      return <>Loading...</>;
    }

    const itemToRender = outlet.menu.map((item, index) => {
      const inputRef = React.createRef();

      const handleMinus = () => {
        inputRef.current.handleMinus();
      };
      const handlePlus = () => {
        inputRef.current.handlePlus();
      };
      if (item.id in cartItems) {
        return (
          <StyledMenuDiv key={index}>
            <StyledFlexContainer>
              <StyledText size="16px" color="#454651" weight="bold">
                {item.name}
              </StyledText>
              <img
                alt="veg"
                src="https://raw.githubusercontent.com/soulpage/image-assets/master/indian-veg-mark.svg"
              />
            </StyledFlexContainer>

            <StyledText size="13px" color="#8C8C8C" weight="normal">
              {item.description}
            </StyledText>
            <StyledText size="16px" color="#454651" weight="normal">
              {item.price}
            </StyledText>
            <StyledFlexContainer>
              <InputGroup>
                <InputGroup.Button onClick={handleMinus}>-</InputGroup.Button>
                <InputNumber
                  className="custom-input-number"
                  ref={inputRef}
                  max={99}
                  min={1}
                  value={this.state.cartItems[item.id]}
                  onChange={value => {
                    this.setState({
                      cartItems: {
                        ...this.state.cartItems,
                        [item.id]: value,
                      },
                    });
                  }}
                />
                <InputGroup.Button onClick={handlePlus}>+</InputGroup.Button>
              </InputGroup>
            </StyledFlexContainer>
          </StyledMenuDiv>
        );
      }
    });

    return (
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%' }}>
          {itemToRender}
          <Button
            style={{
              position: 'sticky',
              bottom: '0px',
              width: '100%',
              left: '0px',
              backgroundColor: '#3498ff',
              color: '#fff',
              zIndex: '9',
            }}
            onClick={() => {
              const { currentoutlet, cartItems, outlet } = this.state;
              this.props.history.push('/auth', {
                outlet,
                currentoutlet,
                cartItems,
              });
            }}
          >
            {Object.keys(this.state.cartItems).length} items <br />
            Place Order
          </Button>
        </div>
      </div>
    );
  }
}
