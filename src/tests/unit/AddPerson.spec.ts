import { mount } from "@vue/test-utils";
import FormPerson from "@/components/FormPerson.vue";

describe("FormPerson.vue", () => {
  it("rendeiza o componente corretamente", () => {
    const wrapper = mount(FormPerson, {
      props: {
        formTitle: "Test Form",
        submitButtonText: "Submit",
        initialFormData: {
          nome: "John Doe",
          cpf: "123.456.789-09",
          dataNascimento: "1990-01-01",
        },
      },
    });

    // Verifique se o componente foi renderizado corretamente
    expect(wrapper.exists()).toBe(true);

    // Verifique se o título e o botão de envio estão presentes
    expect(wrapper.text()).toContain("Test Form");
    expect(wrapper.text()).toContain("Submit");
  });
});