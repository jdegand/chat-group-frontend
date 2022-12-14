import { fireEvent, render, screen } from "@testing-library/react";
import {BrowserRouter as Router} from 'react-router-dom';
import Login from './Login';

describe("Login Functionality", () =>  {

    test("label should be rendered", () => {
        render(<Router><Login /></Router>)
        const usernameLabel = screen.getByLabelText(/username/i);
        expect(usernameLabel).toBeInTheDocument();
    });
  
    test("password input should be rendered", () => {
        render(<Router><Login /></Router>)
        const passwordLabel = screen.getByLabelText(/password/i);
        expect(passwordLabel).toBeInTheDocument();
    });
  
    test("button should be rendered", () => {
        render(<Router><Login /></Router>)
        const buttonEl = screen.getByText(/sign in/i, { selector: 'button' }); // screen.getByRole('button', {name: /sign in/i});
        expect(buttonEl).toBeInTheDocument();
    });

    test("username input should be empty", () => {
        render(<Router><Login /></Router>)
        const usernameLabel = screen.getByLabelText(/username/i);
        expect(usernameLabel.value).toBe("");
    });

    test("password input should be empty", () => {
        render(<Router><Login /></Router>)
        const passwordLabel = screen.getByLabelText(/password/i);
        expect(passwordLabel.value).toBe("");
    });

    test("username input should change", () => {
        render(<Router><Login /></Router>)
        const usernameInputEl = screen.getByLabelText(/username/i)
        const testValue = "test";
      
        fireEvent.change(usernameInputEl, { target: { value: testValue } });
        expect(usernameInputEl.value).toBe(testValue);
    });

    test("password input should change", () => {
        render(<Router><Login /></Router>)
        const passwordInputEl = screen.getByLabelText(/username/i)
        const testValue = "test";
      
        fireEvent.change(passwordInputEl, { target: { value: testValue } });
        expect(passwordInputEl.value).toBe(testValue);
    });

    /*
    test("login", async ()=> {

      // create test user credentials to login in with

      const usernameInputEl = document.querySelector('#username')
      await userEvent.type(usernameInputEl,'test');
      const passwordInputEl = document.querySelector('#password')  
      await userEvent.type(passwordInputEl, 'testPassword');
      const buttonEl = screen.getByText(/sign in/i, { selector: 'button' });
      userEvent.click(buttonEl)

      await waitFor(()=> {
        expect(screen.getByText("Socket")).toBeInTheDocument()
      })

      //get no server response 
    })
    */

    /*
    beforeEach(()=> {
        Object.defineProperty(window, "localStorage", {
            value: {
              getItem: jest.fn(),
              setItem: jest.fn()
            },
            writable: true
          });
      
    })
    */

  /*
      global.localStorage = jest.fn().mockImplementation(() => {
          return {
            getItem: jest.fn().mockReturnValue({"persist": true})
          }
      });
  */

  /*
  // needs auth context

      test("persist checkbox sets local storage", async () => {
        const persist = document.querySelector('#persist');
        //jest.spyOn(Storage.prototype, 'setItem');

      fireEvent.click(persist);
      
      expect(jest.spyOn(window.localStorage.__proto__, "setItem")).toHaveBeenCalled();
   
    });
  */
  
})