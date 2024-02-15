import http from "../http";

export class ContactService {
    static createContact(contact) {
        let contactsUrl = `/contacts`;
        return http.post(contactsUrl, contact);
    }

    static updateContact(contact) {
        let contactsUrl = `/contacts/${contact.id}`;
        return http.put(contactsUrl, contact);
    }

    static deleteContact(contactId) {
        let contactsUrl = `/contacts/${contactId}`;
        return http.delete(contactsUrl);
    }

    static getAllContacts() {
        let contactsUrl = `/contacts/all`;
        return http.get(contactsUrl);
    }

    static getContactById(contactId) {
        let contactUrl = `/contacts/${contactId}`;
        return http.get(contactUrl);
    }

    static getAllGroups() {
        let groupsUrl = `/groups/all`;
        return http.get(groupsUrl);
    }

    static getGroupById(groupId) {
        let groupUrl = `/groups/${groupId}`;
        return http.get(groupUrl);
    }
}