import useNotify from "@/hooks/useNotify";
import React, { useEffect, useState } from "react";
import { profileService } from "@/services/index";

function EditPoll() {

  const { notify } = useNotify();
  const [userPoll, setUserPoll] = useState();

  async function onSubmitForm(e) {
    e.preventDefault();

    await profileService.updatePoll({
      poll: {
        question: userPoll.question,
        options: userPoll.options,
      },
    })
      .then(() => {
        notify("success", "Poll updated successfully");
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  const onUpdatePoll = (e) => {
    const field = e.target.name;
    const options = userPoll?.options;

    if (field === "question")
      setUserPoll({ ...userPoll, question: e.target.value })
    else {
      const index = field.split("-")[1];
      options[index] = e.target.value;
      setUserPoll({ ...userPoll, options })
    }
  };

  useEffect(() => {
    profileService.getInfo()
      .then((res) => {
        console.log(res)
        setUserPoll(res?.data?.poll)
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }, []);

  return (
    <div className="avatar-respond">
      <div className="pin-about-section">
        <span id="span-underline">Partner Poll</span>
        <form onSubmit={onSubmitForm} className="avatar-form">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="pin-post-footer-section mg-12">
                <div className="pin-social-edit-title">
                  <p>Question:</p>
                </div>

                <div className="pin-social-edit-input">
                  <div className="input-group">
                    <textarea
                      name="question"
                      className="form-control"
                      value={userPoll?.question}
                      onChange={onUpdatePoll}
                    />
                  </div>
                </div>
              </div>
              <div className="pin-post-footer-section mg-12">
                <div className="pin-social-edit-title">
                  <p>Option1 *:</p>
                </div>
                <div className="pin-social-edit-input">
                  <div className="input-group">
                    <input
                      type="text"
                      name="option-0"
                      className="form-control"
                      value={userPoll?.options[0]}
                      onChange={onUpdatePoll}
                    />
                  </div>
                </div>
              </div>
              <div className="pin-post-footer-section mg-12">
                <div className="pin-social-edit-title">
                  <p>Option2 *:</p>
                </div>
                <div className="pin-social-edit-input">
                  <div className="input-group">
                    <input
                      type="text"
                      name="option-1"
                      className="form-control"
                      value={userPoll?.options[1]}
                      onChange={onUpdatePoll}
                    />
                  </div>
                </div>
              </div>
              <div className="pin-post-footer-section mg-12">
                <div className="pin-social-edit-title">
                  <p>Option3 :</p>
                </div>
                <div className="pin-social-edit-input">
                  <div className="input-group">
                    <input
                      type="text"
                      name="option-2"
                      className="form-control"
                      value={userPoll?.options[2]}
                      onChange={onUpdatePoll}
                    />
                  </div>
                </div>
              </div>
              <div className="pin-post-footer-section mg-12">
                <div className="pin-social-edit-title">
                  <p>Option4 :</p>
                </div>
                <div className="pin-social-edit-input">
                  <div className="input-group">
                    <input
                      type="text"
                      name="option-3"
                      className="form-control"
                      value={userPoll?.options[3]}
                      onChange={onUpdatePoll}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 mg-12">
              <div className="pin-post-footer-section">
                <div className="pin-edit-button-section">
                  <button
                    type="submit"
                    className="btn-style-one red-light-color"
                  >
                    Update Poll
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPoll;
