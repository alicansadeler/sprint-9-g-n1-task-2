import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import * as Yup from "yup";

const formSemasi = Yup.object().shape({
  title: Yup.string()
    .required("Task başlığı yazmalısınız")
    .min(3, "Task başlığı en az 3 karakter olmalı"),
  description: Yup.string()
    .required("Task açıklaması yazmalısınız")
    .min(10, "Task açıklaması en az 10 karakter olmalı"),
  people: Yup.array()
    .max(3, "En fazla 3 kişi seçebilirsiniz")
    .min(1, "Lütfen en az bir kişi seçin"),
});

const TaskForm = ({ kisiler, submitFn }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    people: [],
  });

  // yup error stateleri
  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
    people: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  // form datası her güncellendiğinde valid mi diye kontrol et
  useEffect(() => {
    formSemasi.isValid(formData).then((valid) => setButtonDisabled(!valid));
  }, [formData]);

  // yup form alani her değiştiğinde çalışan kontrol fonksiyonu
  function formAlaniniKontrolEt(name, value) {
    Yup.reach(formSemasi, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
  }

  // checkboxların değişimini state içerisine eklemek için özel fonksiyon
  function handleCheckboxChange(e) {
    const { value } = e.target;

    let yeniPeople = [...formData.people];
    const index = formData.people.indexOf(value);
    if (index > -1) {
      yeniPeople.splice(index, 1);
    } else {
      yeniPeople.push(value);
    }

    formAlaniniKontrolEt("people", yeniPeople);
    setFormData({
      ...formData,
      people: yeniPeople,
    });
  }

  // diğer form alanları değiştikçe çalışan ve yeni değeri state'e ekleyen fonksiyon
  function handleOthersChange(e) {
    const { name, value } = e.target;
    formAlaniniKontrolEt(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // task ekleme
  function handleSubmit(e) {
    e.preventDefault();
    submitFn({
      ...formData,
      id: nanoid(5),
      status: "yapılacak",
    });
    setFormData({
      title: "",
      description: "",
      people: [],
    });
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          name="title"
          type="text"
          onChange={handleOthersChange}
          value={formData.title}
        />
        <p className="input-error">{formErrors.title}</p>
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          name="description"
          onChange={handleOthersChange}
          value={formData.description}
        ></textarea>
        <p className="input-error">{formErrors.description}</p>
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                onChange={handleCheckboxChange}
                checked={formData.people.includes(p)}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">{formErrors.people}</p>
      </div>

      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          disabled={buttonDisabled}
        >
          Kaydet
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
