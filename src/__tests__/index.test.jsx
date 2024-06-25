import { beforeEach, expect, test } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';
import 'mutationobserver-shim';
import fs from 'fs';
import path from 'path';

const app = fs
  .readFileSync(path.resolve(__dirname, '../App.jsx'), 'utf8')
  .replaceAll(/(?:\r\n|\r|\n| )/g, '');

beforeEach(() => {
  render(<App />);
});

test('1.1.1 Başlık alanına 2 karakter girilince hata mesajı doğru metinle çıkıyor.', async () => {
  const user = userEvent.setup();
  const title = screen.getByLabelText(/Başlık/i);
  await user.type(title, 'Em');
  await screen.findByText(/Task başlığı en az 3 karakter olmalı/i);
});

test('1.1.2 Başlık alanına yazılanlar silinince hata mesajı doğru metinle çıkıyor.', async () => {
  const user = userEvent.setup();
  const title = screen.getByLabelText(/Başlık/i);
  await user.type(title, 'Em');
  await user.clear(title);
  await screen.findByText(/Task başlığı yazmalısınız/i);
});

test('1.2.1 Açıklama alanına 2 karakter girilince hata mesajı doğru metinle çıkıyor.', async () => {
  const user = userEvent.setup();
  const desc = screen.getByLabelText(/Açıklama/i);
  await user.type(desc, '123456789');
  await screen.findByText(/Task açıklaması en az 10 karakter olmalı/i);
});

test('1.2.2 Açıklama alanına yazılanlar silinince hata mesajı doğru metinle çıkıyor.', async () => {
  const user = userEvent.setup();
  const desc = screen.getByLabelText(/Açıklama/i);
  await user.type(desc, '123456789');
  await user.clear(desc);
  await screen.findByText(/Task açıklaması yazmalısınız/i);
});

test('1.3.1 Taskı 4 kişiye atayınca hata mesajı doğru metinle çıkıyor.', async () => {
  const user = userEvent.setup();
  const assignee = screen.getByLabelText(/İsim/i);
  const addButton = screen.getByText('Ekle');
  await user.type(assignee, 'Erdem');
  await user.click(addButton);
  await user.type(assignee, 'Ayşe');
  await user.click(addButton);
  await user.type(assignee, 'Hakan');
  await user.click(addButton);
  await user.type(assignee, 'Mahmut');
  await user.click(addButton);

  await user.click(await screen.findByText('Erdem'));
  await user.click(await screen.findByText('Ayşe'));
  await user.click(await screen.findByText('Hakan'));
  await user.click(await screen.findByText('Mahmut'));
  await screen.findByText(/En fazla 3 kişi seçebilirsiniz/i);
});

test('1.3.2 Taskı 1 kişiye atayıp, o kişi çıkarılınca hata mesajı doğru metin ile çıkıyor.', async () => {
  const user = userEvent.setup();
  const assignee = screen.getByLabelText(/İsim/i);
  const addButton = screen.getByText('Ekle');
  await user.type(assignee, 'Erdem');
  await user.click(addButton);

  const erdem = await screen.findByText('Erdem');
  await user.click(erdem);
  await user.click(erdem);
  await screen.findByText(/Lütfen en az bir kişi seçin/i);
});

test('2.1 Tamamlandı butonuna tıklayınca görev tamamlandı oluyor.', async () => {
  const user = userEvent.setup();
  const button = screen.getAllByText('Tamamlandı');
  await user.click(button[0]);
  const tamamlanmamisGorevler = await screen.findAllByText('Tamamlandı');
  expect(tamamlanmamisGorevler).toHaveLength(2);
});

test("3.0.1 App jsx'e toastify import edilmiş", async () => {
  expect(app.includes('react-toastify')).toBe(true);
});

test("3.0.2 App jsx'e toastify css'i import edilmiş", async () => {
  expect(app.includes('react-toastify/dist/ReactToastify.css')).toBe(true);
});

test('3.1 Yeni kişi eklendiğinde "Yeni kişi oluşturuldu." mesajı toastify ile çıkıyor.', async () => {
  const user = userEvent.setup();
  const assignee = screen.getByLabelText(/İsim/i);
  const addButton = screen.getByText('Ekle');
  await user.type(assignee, 'Erdem');
  await user.click(addButton);

  await screen.findByText('Yeni kişi oluşturuldu.');
});

test('3.2 Yeni görev eklendiğinde "Yeni görev oluşturuldu." mesajı toastify ile çıkıyor.', async () => {
  const user = userEvent.setup();
  const title = screen.getByLabelText(/Başlık/i);
  const desc = screen.getByLabelText(/Açıklama/i);
  const assignee = screen.getByLabelText(/İsim/i);
  const addButton = screen.getByText('Ekle');
  const kaydetButton = screen.getByText('Kaydet');

  await user.type(assignee, 'Erdem');
  await user.click(addButton);
  await user.type(title, 'Test görevi');
  await user.type(desc, 'Test görevinin açıklaması');
  const erdem = await screen.findByText('Erdem');
  await user.click(erdem);
  await user.click(kaydetButton);

  await screen.findByText('Yeni görev oluşturuldu.');
});

test('3.3 Tamamlandı butonuna tıklayınca "2 idli görev tamamlandı." mesajı toastify ile çıkıyor.', async () => {
  const user = userEvent.setup();
  const button = screen.getAllByText('Tamamlandı');
  await user.click(button[0]);
  const tamamlanmamisGorevler = await screen.findByText(
    '2 idli görev tamamlandı.'
  );
});
