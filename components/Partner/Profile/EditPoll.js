import toast from "@/components/Toast";
import { editPoll } from "@/src/redux/Profile/actions";
import React, { useCallback } from "react";
import { connect } from "react-redux";

function EditPoll({ userPoll, updatePoll }) {
  const [form, setForm] = React.useState({
    question: "",
    options: [],
  });
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const onSubmitForm = (e) => {
    e.preventDefault();

    updatePoll({ poll: form }, (res, error) => {
      if (error) {
        notify("error", error.message);
        return;
      }
      notify("success", "Poll updated successfully");
    });
  };

  const onUpdatePoll = (e) => {
    const field = e.target.name;
    const options = form.options;

    if (field === "question") {
      setForm({ ...form, question: e.target.value });
    } else {
      const index = field.split("-")[1];

      options[index] = e.target.value;
      setForm({ ...form, options });
    }
  };
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
                      value={form.question}
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
                      value={form.options[0]}
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
                      value={form.options[1]}
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
                      value={form.options[2]}
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
                      value={form.options[3]}
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

const mapStateToProps = ({ profile }) => {
  return {
    userPoll: profile.userPoll,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updatePoll: (info, cb) => dispatch(editPoll(info, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPoll);
