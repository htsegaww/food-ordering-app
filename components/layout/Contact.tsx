import SectionHeaders from "./SectionHeaders";

export default function Contact() {
  return (
    <section>
      <SectionHeaders subHeader="Get in touch" mainHeader="Contact Us" />

      <div className="mt-8">
        <form className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="p-3 rounded-md border border-gray-300"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-md border border-gray-300"
          />
          <textarea
            placeholder="Message"
            className="p-3 rounded-md border border-gray-300"
          ></textarea>
          <button className="p-3 bg-primary text-white rounded-md">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
