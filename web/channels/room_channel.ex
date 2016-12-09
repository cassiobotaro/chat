defmodule Chat.RoomChannel do
  use Chat.Web, :channel

  def join("room:lobby", _messages, socket) do
    {:ok, socket}
  end

  def handle_in("mensagem", %{"mensagem" => mensagem}, socket) do
    broadcast socket, "mensagem", %{mensagem: mensagem, usuario: socket.assigns.usuario}
    {:noreply, socket}
  end

end
