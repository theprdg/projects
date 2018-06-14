import React, { Component } from 'react'

export default class SubmitModal extends Component {


  render() {
    return (
      <div className="modal fade" id="submitModal" role="dialog">
        <div className="modal-dialog">

          {/* MODAL BOX */}
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Share a Recipe</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">
              <form action="" method="post">
                <div>
                  <label>Name:</label>
                  <input type="text" id="name" name="user_name" />
                </div>
                <div>
                  <label>E-mail:</label>
                  <input type="email" id="mail" name="user_mail" />
                </div>
                <div>
                  <label>Brew Method:</label>
                  <select>
                    <option value="" selected disabled>
                      Select &nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;
                      &#x25BC;
                      </option>
                    <option value="chemex">
                      Chemex
                      </option>
                    <option value="v60">
                      v60
                      </option>
                    <option value="aeropress">
                      Aeropress
                      </option>
                    <option value="frenchpress">
                      French Press
                      </option>
                  </select>
                </div>
                <div>
                  <label>Recipe Name:</label>
                  <input type="text" id="" name="" />
                </div>
                <div>
                  <label>Description:</label>
                  <div>
                    <textarea id="" name=""></textarea>
                  </div>
                </div>
                <div>
                  <label>Apparatus:</label>
                  <div>
                    <textarea id="" name=""></textarea>
                  </div>
                </div>
                <p></p>
                <div>
                  <label>Brew Time (mm:ss):</label>
                  <input type="text" id="" name="" />
                </div>
                <div>
                  <label>Serving Size:</label>
                  <input type="text" id="" name="" />
                </div>
                <div>
                  <label>Coffee Weight (g):</label>
                  <input type="text" id="" name="" />
                </div>
                <div>
                  <label>Coarseness:</label>
                  <input type="text" id="" name="" />
                </div>
                <div>
                  <label>Water (mL):</label>
                  <input type="text" id="" name="" />
                </div>
                <div>
                  <label>Temperature (°F):</label>
                  <input type="text" id="" name="" />
                </div>
                <p></p>
                <div>
                  <label><u>Recipe Steps</u></label>
                  <div>
                    <label className="userSteps">Step 1</label>
                    <input type="text" id="" name="" />
                    <div>
                      <label className="userSteps">Step Brew Time (mm:ss)</label>
                      <input type="text" id="" name="" />
                    </div>
                  </div>
                  <div>
                    <label className="userSteps">Step 2</label>
                    <input type="text" id="" name="" />
                    <div>
                      <label className="userSteps">Step Brew Time (mm:ss)</label>
                      <input type="text" id="" name="" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="" data-dismiss="modal">
                <strong>Submit</strong>
              </button>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
