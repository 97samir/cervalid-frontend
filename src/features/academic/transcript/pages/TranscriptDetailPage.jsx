import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import TranscriptItemModal from "../components/TranscriptItemModal";
import TranscriptSummaryCard from "../components/TranscriptSummaryCard";
import TranscriptItemsTable from "../components/TranscriptItemsTable";

import { useTranscript } from "../hooks/useTranscript";
import { useAddTranscriptItem } from "../hooks/useAddTranscriptItem";
import { useUpdateTranscriptItem } from "../hooks/useUpdateTranscriptItem";
import { useDeleteTranscriptItem } from "../hooks/useDeleteTranscriptItem";
import { useFinalizeTranscript } from "../hooks/useFinalizeTranscript";
//import { useIssueTranscript } from "../hooks/useIssueTranscript";
import { useIssueCertificate } from "../../certificate/hooks/useIssueCertificate";

export default function TranscriptDetailPage() {

    const EMPTY_ITEM = {
        courseCode: "",
        courseName: "",
        credits: 1,
        grade: "",
    };

    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [form, setForm] = useState(EMPTY_ITEM);
    const { transcriptPublicId } = useParams();

    const {
        data: transcript,
        isLoading,
        error,
    } = useTranscript(transcriptPublicId);

    const addMutation = useAddTranscriptItem();
    const updateMutation = useUpdateTranscriptItem();
    const deleteMutation = useDeleteTranscriptItem();
    const finalizeMutation = useFinalizeTranscript();
    const issueMutation = useIssueCertificate();

    if (isLoading) {
        return (
        <div className="text-center py-5">
            <div className="spinner-border text-primary" />
        </div>
        );
    }

    if (error) {
        return (
        <div className="alert alert-danger">
            No fue posible cargar el historial académico.
        </div>
        );
    }

    const handleCreate = () => {

        setEditingItem(null);
        setForm(EMPTY_ITEM);
        setShowModal(true);
    };

    const handleEdit = (item) => {

        setEditingItem(item);

        setForm({
            courseCode: item.courseCode,
            courseName: item.courseName,
            credits: item.credits,
            grade: item.grade,
        });

        setShowModal(true);
    };

    const handleDelete = (itemPublicId) => {

        const confirmDelete = window.confirm(
            "¿Está seguro de eliminar este curso?");

            if (!confirmDelete) return;

            deleteMutation.mutate({
                transcriptPublicId,
                itemPublicId,
            });

    };

    const handleCloseModal = () => {

        setShowModal(false);
        setEditingItem(null);
        setForm(EMPTY_ITEM);
    };

    const handleSubmitItem = (formData) => {

        const options = {
            onSuccess: () => {
                handleCloseModal();
            }
        };

        if(editingItem){

            updateMutation.mutate(
                {
                    transcriptPublicId,
                    itemPublicId: editingItem.publicId,
                    data: formData,
                },
                options
            );
        }else{

            addMutation.mutate(
                {
                    transcriptPublicId,
                    data: formData,
                },
                options
            );
        }
    };

    const handleFinalize = () => {

        const confirmed = window.confirm(
            "¿Está seguro de finalizar este historial académico?"
        );

        if(!confirmed) return;

        finalizeMutation.mutate(transcriptPublicId);
    };

    const handleIssue = () => {

        const confirmed = window.confirm(
            "¿Desea emitir el certificado oficial asociado a este historial académico?"
        );

        if(!confirmed) return;

        issueMutation.mutate(transcriptPublicId);
    };

    return (
        <div className="container-fluid">
            {/* Header */}

            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                    <h2 className="fw-bold mb-1">Historial Académico</h2>

                    <p className="text-muted mb-0">
                    Consulte y administre los cursos registrados.
                    </p>
                </div>

                <Link to={-1} className="btn btn-outline-secondary">
                    Volver
                </Link>
                </div>
            </div>

            {/* <TranscriptCard transcript={transcript} /> */}
            
            <TranscriptSummaryCard
                transcript={transcript}
                onFinalize={handleFinalize}
                onIssue={handleIssue}
                finalizing={finalizeMutation.isPending}
                issuing={issueMutation.isPending}
            />

            <TranscriptItemsTable
                transcript={transcript}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <TranscriptItemModal
                show={showModal}
                form={form}
                setForm={setForm}
                editingItem={editingItem}
                onClose={handleCloseModal}
                onSubmit={handleSubmitItem}
                loading={
                    addMutation.isPending ||
                    updateMutation.isPending
                }
            />
        </div>
    );
}
